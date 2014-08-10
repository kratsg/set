require 'json'

# magic (trust me, I know what I'm doing)
cards = (1..3).to_a.product(* [(1..3).to_a] * 3 ).map do |number, color, shape, fill|
  {
    number: number,
    color: color,
    shape: shape,
    fill: fill
  }
end

File.open("../json/cards.json","w+") do |f|
  f.write JSON.pretty_generate cards.shuffle!
end
