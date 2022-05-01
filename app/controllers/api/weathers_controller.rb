require "byebug"
class Api::WeathersController < ApplicationController
  require "rest-client"
  require "json"

  def show
    lat, lon = params[:lat], params[:lon]
    key = Rails.application.credentials.open_weather[:api_key]
    url = "https://api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&appid=#{key}"
    res = RestClient.get(url)
    render json: res
  end
end