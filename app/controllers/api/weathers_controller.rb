require "byebug"
class Api::WeathersController < ApplicationController
  require "rest-client"
  require "json"

  def show
    key = Rails.application.credentials.open_weather[:api_key]
    if params[:lat] && params[:lon]
      lat, lon = params[:lat], params[:lon]
      # url = "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=#{lat}&lon=#{lon}&appid=#{key}"
      url = "https://api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&appid=#{key}"
    elsif params[:cityId]
      cityId = params[:cityId]
      url = "https://api.openweathermap.org/data/2.5/weather?id=#{cityId}&appid=#{key}"
    end
      res = RestClient.get(url)
      render json: res
  end
end