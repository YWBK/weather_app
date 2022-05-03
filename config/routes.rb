Rails.application.routes.draw do
  root to: 'static_pages#root'
  get '/:cityId', to: 'static_pages#root'
  
  namespace :api, defaults: { format: :json } do
    get '/cities', to: 'cities#show', as: 'city'
    get '/weather', to: 'weathers#show', as: 'weather'
  end
end
