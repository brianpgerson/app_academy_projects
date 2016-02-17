Rails.application.routes.draw do
  resources :users, only:[:create, :new, :show]
  resource :session, only:[:new, :create, :destroy]
  resources :subs
  resources :posts, except:[:index]
  # get '/subs' => 'subs#index', as: 'subs'
  # post '/subs' => 'subs#create'
  # get '/subs/:id' => 'subs#show', as: 'sub'
  # patch '/subs/:id' => 'subs#update'
  # delete '/subs/:id' => 'subs#destroy'
  # get 'subs/new' => 'subs#new', as: 'new_sub'
  # get '/subs/:id/edit' => 'subs#edit', as: 'edit_sub'

end
