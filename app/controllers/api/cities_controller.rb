require "byebug"
class Api::CitiesController < ApplicationController
  require "rest-client"
  require "json"

  def show
    city = params[:city]
    # debugger
    key = Rails.application.credentials.open_weather[:api_key]
    url = "http://api.openweathermap.org/geo/1.0/direct?q=#{city}&limit=5&appid=#{key}"
    res = RestClient.get(url)
    parsed = JSON.parse(res.body)
    parsed.map! { |city| city.except("local_names") }
    # debugger
    render json: parsed
  end
end