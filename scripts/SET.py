def frm(x, b):
    """
    Converts given number x, from base 10 to base b
    x -- the number in base 10
    b -- base to convert
    """
    assert(x >= 0)
    assert(1< b < 37)
    r = ''
    import string
    while x > 0:
        r = string.printable[x % b] + r
        x //= b
    return r

def to(s, b):
    """
    Converts given number s, from base b to base 10
    s -- string representation of number
    b -- base of given number
    """
    assert(1 < b < 37)
    return int(s, b)

def convert(s, a, b, pad=-1):
    """
    Converts s from base a to base b
    """
    number = '0' if s == '0' else frm(to(s, a), b)
    return number.zfill(pad)

# all potential card representations
cards = [convert(str(i), 10, 3, 4) for i in range(81)]

# define some helpful functions
def allEqual(x):
  iterator = iter(x)
  try:
    first = next(iterator)
  except StopIteration:
    return True
  return all(first == rest for rest in iterator)

def allUnique(x):
  seen = list()
  return not any(i in seen or seen.append(i) for i in x)

def isSet(x):
  return (allEqual(x) or allUnique(x))

def cardSet(a, b, c):
  return all(isSet(i) for i in zip(a, b, c))

# obvious cards that form a set: '0000', '1111', '2222'
'''
by construction, given two cards, there's exactly one card that forms a set
with the two cards
'''
# pick the two cards and maybe see if there's a pattern
numbers = [i for i in range(81) if convert(str(i), 10, 3, 4) not in ['0000', '1111']]

for i in numbers:
  c_or = i | 40 | 0
  c_and = i & 40 & 0
  c_xor = i ^ 40 ^ 0
  print i, cardSet('0000', '1111', convert(str(i), 10, 3, 4))
  print '{0:05d} {1:05d} {2:05d}'.format(c_or, c_and, c_xor)
  print '{0:>5s} {1:>5s} {2:>5s}'.format(convert(str(c_or), 10, 3, 5), convert(str(c_and), 10, 3, 5), convert(str(c_xor), 10, 3, 5))
  print "="*17


all_sets = []
import itertools
for possible_set in itertools.combinations(cards, 3):
  if cardSet(*possible_set): all_sets.append(possible_set)
