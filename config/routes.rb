Rails.application.routes.draw do
  root "messages#index"
  resources :account, only: [:index]
end
