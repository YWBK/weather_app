require "byebug"
class Api::CitiesController < ApplicationController
  require "rest-client"
  require "json"

  def show
    city = params[:city]
    state = params[:state] ? ", #{params[:state]}" : ''
    country = params[:country] ? ", #{params[:country]}" : ''
    key = Rails.application.credentials.open_weather[:api_key]
    url = "http://api.openweathermap.org/geo/1.0/direct?q=#{city}#{state}#{country}&limit=5&appid=#{key}"
    res = RestClient.get(url)
    parsed = JSON.parse(res.body)
    parsed.map! { |city| city.except("local_names") }
    render json: parsed
  end
end