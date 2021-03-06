# == Schema Information
#
# Table name: courses
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  prereq_id     :integer
#  instructor_id :integer
#  created_at    :datetime
#  updated_at    :datetime
#

class Course < ActiveRecord::Base
  has_many :enrollments,
    foreign_key: :course_id,
    primary_key: :id,
    class_name: "Enrollment"

    has_many :enrolled_students,
      through: :enrollments,
      source: :user

    has_many :prerequisites,
      foreign_key: :id,
      primary_key: :prereq_id,
      class_name: "Course"

    has_many :instructors,
      foreign_key: :id,
      primary_key: :instructor_id,
      class_name: "User"

end
