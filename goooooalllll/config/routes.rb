Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :goals
  resources :users, only: [:new, :create]
end
