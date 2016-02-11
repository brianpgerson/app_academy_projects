class DumbTableNameChange < ActiveRecord::Migration
  def change
    rename_table :cat_tables, :cats
  end
end
