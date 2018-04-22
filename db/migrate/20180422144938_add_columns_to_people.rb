class AddColumnsToPeople < ActiveRecord::Migration[5.1]
  def change
    add_column :people, :name, :string
    add_column :people, :bio, :text
    add_column :people, :bioVisible, :boolean
  end
end
