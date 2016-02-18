Rails.application.routes.draw do
  root to: "staticpages#root"
  namespace :api do
    resources :todos, only: [:index, :create, :update, :destroy, :show]
  end
end
