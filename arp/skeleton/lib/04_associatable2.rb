require_relative '03_associatable'

# Phase IV
module Associatable
  # Remember to go back to 04_associatable to write ::assoc_options

  def has_one_through(name, through_name, source_name)
    define_method(name) do
      through_options = self.class.assoc_options[through_name]
      source_options = through_options.model_class.assoc_options[source_name]

      source_table = source_options.class_name.constantize.table_name
      source_primary_key = source_options.primary_key
      source_foreign_key = source_options.foreign_key

      through_table = through_options.class_name.constantize.table_name
      through_primary_key = through_options.primary_key
      through_foreign_key = through_options.foreign_key

      to_match_id = self.send("#{through_options.foreign_key}")

      results = DBConnection.execute(<<-SQL)
        SELECT #{source_table}.*
        FROM #{source_table}
        JOIN #{through_table}
        ON #{source_table}.#{source_primary_key} = #{through_table}.#{source_foreign_key}
        WHERE #{through_table}.#{through_primary_key} = #{to_match_id}
      SQL
      debugger
      source_options.class_name.constantize.parse_all(results).first
    end
  end
end

# SELECT *
# FROM houses
# JOIN humans
# ON houses.id = humans.house_id
# WHERE humans.id = 1
