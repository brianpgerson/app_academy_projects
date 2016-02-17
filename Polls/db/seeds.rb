# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


def make_user!
  User.create!(user_name: Faker::Name.name)
end

def make_polls!
  titles = ["Batman Movies", "Dogs", "Cats"]
  titles.each do |title|
    Poll.create!(title: title,  author_id: User.all.sample.id)
  end
end

def make_questions!
  questions = [
              "Which is your favorite?",
              "Which is your least favorite?",
              "Which do you not know about?"
              ]
  Poll.all.each do |poll|
    questions.each do |question|
      Question.create!(question: question, parent_poll_id: poll.id)
    end
  end
end

def make_answer_choices!
  batman_answer_choice = [
                      "Batman Begins",
                      "The Dark Knight",
                      "Batman and Robin"
                      ]
  dog_answer_choice = [
                    "Labradoodle",
                    "Dachshund",
                    "German Shepard"
                    ]
  cat_answer_choice = [
                    "Russian Blue",
                    "Maine Coon",
                    "Tabby"
                  ]
  Poll.all[0].questions.each do |question|
    batman_answer_choice.each do |choice|
      AnswerChoice.create!(answer_choice: choice, question_id: question.id)
    end
  end

  Poll.all[1].questions.each do |question|
    dog_answer_choice.each do |choice|
      AnswerChoice.create!(answer_choice: choice, question_id: question.id)
    end
  end

  Poll.all[2].questions.each do |question|
    cat_answer_choice.each do |choice|
      AnswerChoice.create!(answer_choice: choice, question_id: question.id)
    end
  end
end
#we shoudl have dropped talbes here
10.times {make_user!}
make_polls!
make_questions!
make_answer_choices!
