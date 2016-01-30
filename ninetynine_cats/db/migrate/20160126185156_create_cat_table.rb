class CreateCatTable < ActiveRecord::Migration
  def change
    create_table :cat_tables do |t|
      t.date :birthdate, null: false
      t.string :color, null: false
      t.string :name, null: false
      t.string :sex, null: false, limit: 1
      t.text :description, null: false
      t.timestamps
    end
  end
end
