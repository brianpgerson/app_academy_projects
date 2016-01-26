# == Schema Information
#
# Table name: responses
#
#  id               :integer          not null, primary key
#  user_id          :integer          not null
#  answer_choice_id :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Response < ActiveRecord::Base
  validates :answer_choice_id, presence: true
  validates :user_id, presence: true
  validate :not_duplicate_response
  validate :respondent_not_poll_author


  belongs_to :answer_choice,
    foreign_key: :answer_choice_id,
    primary_key: :id,
    class_name: "AnswerChoice"

  belongs_to :respondent,
    foreign_key: :user_id,
    primary_key: :id,
    class_name: "User"

  has_one :question,
    through: :answer_choice,
    source: :question

  has_one :poll_author,
    through: :answer_choice,
    source: :poll_author

    def sibling_responses
      self.question.responses.where.not(:id => self.id)
    end

    def respondent_already_answered?
      self.sibling_responses.exists?(user_id = self.user_id)
    end

    def respondent_not_poll_author?
      self.poll_author.id != self.user_id
    end

    private
    def not_duplicate_response
      if respondent_already_answered?
        errors[:response] << "This repondent already tried to answer this question you dummy!"
      end
    end

    def respondent_not_poll_author
      unless respondent_not_poll_author?
        errors[:response] << "This repondent is the Poll Creator!"
      end
    end


end
