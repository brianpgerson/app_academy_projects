class IndexRequesterid < ActiveRecord::Migration
  def change
    add_index :cat_rental_requests, :requester_id
  end
end
