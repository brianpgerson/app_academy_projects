class ContactShare < ActiveRecord::Migration
  def change
    create_table :contact_shares do |k|
      k.integer :contact_id, null: false
      k.integer :user_id, null: false
      k.timestamps
    end
    add_index :contact_shares, [:contact_id, :user_id], unique: true
    add_index :contact_shares, :contact_id
    add_index :contact_shares, :user_id
    
  end

end
