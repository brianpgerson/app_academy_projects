class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.boolean :completed, null: false, :default => false
      t.boolean :public, null: false, :default => false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :goals, :user_id
  end
end
