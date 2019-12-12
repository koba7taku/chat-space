Rails.application.routes.draw do
  root "messages#index"
  resource :account, only: [:index]
end
