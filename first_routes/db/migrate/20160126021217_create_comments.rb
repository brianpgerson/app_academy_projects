class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :comment_text
      t.integer :commentable_id
      t.string :commentable_type
      t.timestamps null: false
    end

    add_index :comments, :commentable_id
    add_index :comments, :commentable_type

  end
end
