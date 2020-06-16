class Api::EventsController < ApplicationController
  respond_to :json

  def index
    respond_with Event.order(event_date: :desc)
  end

  def show
    respond_with Event.find(params[:id])
  end

  def create
    respond_with :api, Event.create(event_params)
  end

  def destroy
    respond_with Event.destroy(params[:id])
  end

  def update
    event = Event.find(params[:id])
    event.update(event_params)
    respond_with Event, json: event
  end

  private
    def event_params
      params.require(:event).permit(
        :id,
        :event_date,
        :event_type,
        :title,
        :speaker,
        :host,
        :published
      )
    end
end
