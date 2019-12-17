class User < ApplicationRecord
  has_many :groups, through: :group_users
  has_many :group_users
  has_many :messages
  # has_many :
   # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
 

