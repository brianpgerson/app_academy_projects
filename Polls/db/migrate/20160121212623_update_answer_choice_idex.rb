class UpdateAnswerChoiceIdex < ActiveRecord::Migration
  def change
    remove_index :answer_choices, :answer_choice
    add_index :answer_choices, :answer_choice
  end
end
