class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :question, null: false
      t.integer :parent_poll_id, null: false
      t.timestamps null: false
    end

    add_index :questions, :parent_poll_id
  end
end
