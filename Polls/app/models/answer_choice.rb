# == Schema Information
#
# Table name: answer_choices
#
#  id            :integer          not null, primary key
#  answer_choice :text             not null
#  question_id   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class AnswerChoice < ActiveRecord::Base
  validates :answer_choice, presence: true
  validates :question_id, presence: true

  belongs_to :question,
    foreign_key: :question_id,
    primary_key: :id,
    class_name: "Question"

  has_many :responses,
    foreign_key: :answer_choice_id,
    primary_key: :id,
    class_name: "Response"

  has_one :poll_author,
    through: :question,
    source: :author
end
