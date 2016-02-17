require "byebug"
require_relative '02_searchable'
require 'active_support/inflector'

# Phase IIIa
class AssocOptions
  attr_accessor(
    :foreign_key,
    :class_name,
    :primary_key
  )

  def model_class
    self.class_name.constantize
  end

  def table_name
    model_class.table_name
  end
end

class BelongsToOptions < AssocOptions
  def initialize(name, options = {})
    defaults = {
      foreign_key: "#{name.to_s.underscore}_id".to_sym,
      primary_key: :id,
      class_name: "#{name}".camelcase
    }
    options = defaults.merge(options)
    options.each do |key, val|
      instance_variable_set("@#{key}", val)
    end
  end


end

class HasManyOptions < AssocOptions
  def initialize(name, self_class_name, options = {})
      defaults = {

      foreign_key: "#{self_class_name.underscore}_id".downcase.to_sym,
      primary_key: :id,
      class_name: "#{name}".singularize.camelcase
    }
    options = defaults.merge(options)
    options.each do |key, val|
      instance_variable_set("@#{key}", val)
    end
  end
end

module Associatable
  # Phase IIIb
  def belongs_to(name, options = {})
    self.assoc_options[name] = BelongsToOptions.new(name, options)

    define_method(name) do
      options = self.class.assoc_options[name]

      foreign_key_value = self.send("#{options.send("#{:foreign_key}")}")
      primary_key = options.send("#{:primary_key}")
      target_class = options.model_class

      thing = target_class.where("#{primary_key}" => foreign_key_value).first
    end


  end

  def has_many(name, options = {})
    self.assoc_options[name] = HasManyOptions.new(name, self.name, options)

    define_method(name) do
      options = self.class.assoc_options[name]

      foreign_key = options.send("#{:foreign_key}")
      primary_key_value = self.send("#{options.send("#{:primary_key}")}")
      target_class = options.model_class

      thing = target_class.where("#{foreign_key}" => primary_key_value)
    end
  end

  def assoc_options
    @assoc_options ||= {}
  end
end

class SQLObject
  extend Associatable
end
