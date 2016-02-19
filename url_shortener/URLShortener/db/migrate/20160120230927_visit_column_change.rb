class VisitColumnChange < ActiveRecord::Migration
  def change
    rename_column :visits, :short_url, :shortened_url
  end
end
