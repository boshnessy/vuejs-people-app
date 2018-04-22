class PeopleController < ApplicationController
  def index
    people = Person.all 
    render json: people.as_json
  end

  def create
    person = Person.new(
      name: params[:name],
      bio: params[:bio],
      bioVisible: true
    )
  end
end
