class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.integer :_id, null: false,  foreing_key: true
      t.integer :group_id, null: false,  foreing_key: true
      t.timestamps
    end
  end
end
