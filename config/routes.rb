Rails.application.routes.draw do
  root to: 'static_pages#root'
  # get '*path', to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    get '/cities/:city', to: 'cities#show', as: 'city'
  end
end
