class CatRentalRequest < ActiveRecord::Base
  validates_presence_of :cat_id, :start_date, :end_date, :status
  validates :status, inclusion: { in: ["PENDING", "APPROVED", "DENIED"] }
  validate :overlapping_requests
  validate :start_end_dates
  belongs_to :cat

  def approve
    transaction do
      self.update(status: "APPROVED") #step one
      maybe_overlapping_pending_requests.each do |request|
        if request.start_date.between?(self.start_date, self.end_date) ||
          request.end_date.between?(self.start_date, self.end_date)
            request.update(status: "DENIED")
        end
      end
    end
  end

  def deny
    self.update(status: "DENIED")
  end

  def maybe_overlapping_pending_requests
    other_requests = self.cat.cat_rental_requests.where.not(id: self.id).where(status: "PENDING")
  end

  def pending?
    self.status == "PENDING"
  end

  private
  def overlapping_requests #TODO refactor
    self.cat.cat_rental_requests.where.not(id: self.id).each do |request|
      if request.start_date.between?(self.start_date, self.end_date) ||
        request.end_date.between?(self.start_date, self.end_date)
          overlapping_approved_requests(request)
      end
    end
  end

  def start_end_dates
    if self.end_date < self.start_date
      errors[:start_date] << "Start date must be before end date!"
    end
  end

  def overlapping_approved_requests(request)
    #i know, i know, we could optimize this for fewer queries
    if request.status == "APPROVED" && self.status == "APPROVED"
      errors[:status] << "Can't have 2 approved requests"
    end
  end
end
