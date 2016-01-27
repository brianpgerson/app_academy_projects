class CreateAnswerChoices < ActiveRecord::Migration
  def change
    create_table :answer_choices do |t|
      t.text :answer_choice, null: false
      t.integer :question_id, null: false
      t.timestamps null: false
    end
    add_index :answer_choices, :answer_choice, unique: true
  end
end
