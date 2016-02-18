Rails.application.routes.draw do
  resources :cats do
    resources :cat_rental_requests, only: [:index]
  end
  resources :cat_rental_requests, only: [:new, :create]
  patch 'cats/:id/approve' => 'cat_rental_requests#approve!', :as => 'approval'
  patch 'cats/:id/deny' => 'cat_rental_requests#deny!', :as => 'denial'
end
