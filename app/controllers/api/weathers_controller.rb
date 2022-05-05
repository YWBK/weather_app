class Api::WeathersController < ApplicationController
  require "rest-client"
  require "json"

  def show
    key = Rails.application.credentials.open_weather[:api_key]
    if params[:lat] && params[:lon]
      lat, lon = params[:lat], params[:lon]
      url = "https://api.openweathermap.org/data/2.5/weather?lat=#{lat}&lon=#{lon}&units=imperial&appid=#{key}"
    elsif params[:city_id]
      city_id = params[:city_id]
      url = "https://api.openweathermap.org/data/2.5/forecast?id=#{city_id}&units=imperial&appid=#{key}"
    end
      res = RestClient.get(url)
      render json: res
  end
end