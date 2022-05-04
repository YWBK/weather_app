require "byebug"
class Api::CitiesController < ApplicationController
  require "rest-client"
  require "json"

  def show
    key = Rails.application.credentials.open_weather[:api_key]
    if params[:city]
      city = params[:city]
      state = params[:state] ? ", #{params[:state]}" : ''
      country = params[:country] ? ", #{params[:country]}" : ''
      url = "http://api.openweathermap.org/geo/1.0/direct?q=#{city}#{state}#{country}&limit=5&appid=#{key}"
    elsif params[:lat] && params[:lon]
      lat, lon = params[:lat], params[:lon]
      url = "http://api.openweathermap.org/geo/1.0/reverse?lat=#{lat}&lon=#{lon}&limit=5&appid=#{key}"
    end
    res = RestClient.get(url)
    parsed = JSON.parse(res.body)
    parsed.map! { |city| city.except("local_names") }
    render json: parsed
  end
end