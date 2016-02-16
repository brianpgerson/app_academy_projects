require "byebug"
require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    @one_row ||= DBConnection.execute2(<<-SQL)
      SELECT *
      FROM #{table_name}
      LIMIT 0
    SQL
    .first.map { |col| col.to_sym }
  end

  def self.finalize!
    self.columns.each do |col|
      define_method("#{col}") do
        attributes[col]
      end
      define_method("#{col}=") do |val|
        attributes[col] = val
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name ||= self.to_s.tableize
  end

  def self.all
    results = DBConnection.execute(<<-SQL)
      SELECT #{self.table_name}.*
      FROM #{self.table_name}
    SQL
    parse_all(results)
  end

  def self.parse_all(results)
    results.map { |hash| self.new(hash) }
  end

  def self.find(id)
    results = DBConnection.execute(<<-SQL, id)
      SELECT #{self.table_name}.*
      FROM #{self.table_name}
      WHERE #{self.table_name}.id = ?
    SQL
    parse_all(results).first
  end

  def initialize(params = {})
    params.each do |attr_name, value|
      unless self.class.columns.include?(attr_name.to_sym)
        raise "unknown attribute '#{attr_name}'"
      end
      self.send "#{attr_name}=", value
    end

  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.class.columns.map{ |col| self.send("#{col}") }
  end

  def insert
    n = attribute_values.length
    col_names = self.class.columns.join(", ")
    question_marks = ["?"] * n
    values = attribute_values

    DBConnection.execute(<<-SQL, *values)
      INSERT INTO #{self.class.table_name} (#{col_names})
      VALUES (#{question_marks.join(", ")})
    SQL

    id = (DBConnection.last_insert_row_id)
    self.send "#{:id}=", id

  end

  def update
    set_line = self.class.columns.map do |col|
      "#{col} = ?"
    end.join(", ")
    id = attribute_values.first
    values = attribute_values.drop(1)


    DBConnection.execute(<<-SQL, id, *values)
      UPDATE #{self.class.table_name}
      SET #{set_line}
      WHERE id = #{id}
    SQL
  end

  def save
    if self.id.nil?
      self.insert
    else
      self.update
    end
  end
end
