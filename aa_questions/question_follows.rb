class QuestionFollows
  def initialize(options)
    @user_id, @question_id = options.values_at('user_id', 'question_id')
  end


  def self.followers_for_question(question_id)
    db = QuestionsDatabase.instance
    followers = db.execute(<<-SQL, question_id: question_id)
      SELECT
        users.id,
        users.fname,
        users.lname
      FROM
        users
      JOIN question_follows ON users.id = question_follows.user_id
      WHERE
        question_follows.question_id = :question_id
    SQL

    followers.map { |follower| Users.new(follower) }
  end

  def self.followed_questions_for_user_id(user_id)
    db = QuestionsDatabase.instance
    questions = db.execute(<<-SQL, user_id: user_id)
      SELECT
        questions.id, questions.title, questions.body, questions.author_id
      FROM
        questions
      JOIN question_follows ON questions.id = question_follows.question_id
      WHERE
        question_follows.user_id = :user_id
    SQL

    questions.map { |question| Question.new(question) }
  end

  def self.most_followed_questions(n)
    db = QuestionsDatabase.instance
    most_followed = db.execute(<<-SQL, n: n)
      SELECT
        questions.id, questions.title, questions.body, questions.author_id
      FROM
        questions
      JOIN question_follows ON questions.id = question_follows.question_id
      GROUP BY
        questions.title
      ORDER BY
        COUNT(question_follows.user_id) DESC
      LIMIT
        :n
    SQL

    most_followed.map { |question| Question.new(question) }
  end

end
