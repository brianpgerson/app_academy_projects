# == Schema Information
#
# Table name: goals
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  description :string           not null
#  completed   :boolean          default(FALSE), not null
#  public      :boolean          default(FALSE), not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'rails_helper'

RSpec.describe Goal, :type => :model do
  let(:goal) { FactoryGirl.build(:goal) }
  let(:no_title) { FactoryGirl.build(:no_title) }

  context "when default values are valid" do
    it "returns as valid and defaults booleans to false" do
      expect(goal).to be_valid
      expect(goal.completed).to eq(false)
      expect(goal.public).to eq(false)
    end
  end

end
