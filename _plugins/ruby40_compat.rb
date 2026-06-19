# Ruby 4.0 removed Object#tainted? which Liquid 4.x still calls.
# This shim restores it so Jekyll builds without errors on Ruby 4.0.
class Object
  def tainted?
    false
  end
end
