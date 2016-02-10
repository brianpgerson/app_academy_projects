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

FactoryGirl.define do
  factory :goal do
    title { Faker::Hacker.verb + " " + Faker::Hacker.noun }
    description { Faker::Lorem.sentence }
    user_id { 1 }


    factory :no_title do
      title nil
    end



  end
end
