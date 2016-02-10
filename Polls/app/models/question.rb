# == Schema Information
#
# Table name: questions
#
#  id             :integer          not null, primary key
#  question       :text             not null
#  parent_poll_id :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Question < ActiveRecord::Base
  validates :question, presence: true
  validates :parent_poll_id, presence: true

  belongs_to :poll,
    foreign_key: :parent_poll_id,
    primary_key: :id,
    class_name: "Poll"

  has_many :answer_choices,
    foreign_key: :question_id,
    primary_key: :id,
    class_name: "AnswerChoice"

  has_many :responses,
    through: :answer_choices,
    source: :responses

  has_one :author,
    through: :poll,
    source: :poll_author

  def results
    res = {}
    self.answer_choices.each do |answer_choice|
      res[answer_choice.answer_choice] = answer_choice.responses.count
    end
    res
  end

  def results_better
    res = {}
    self.answer_choices.includes(:responses).each do |answer_choice|
      res[answer_choice.answer_choice] = answer_choice.responses.count
    end
  end

  def results_one_more
    res = {}
    self.answer_choices.select(responses).includes(:responses).group("answer_choices.answer_choice").count.references(:responses)
  end

end
# SELECT answer_choices.answer_choice, COUNT(responses.id)
# FROM questions
# LEFT OUTER JOIN answer_choices ON answer_choices.question_id = questions.id
# LEFT OUTER JOIN responses ON responses.answer_choice_id = answer_choices.id
# WHERE answer_choices.question_id = 1
# GROUP BY answer_choices.answer_choice
