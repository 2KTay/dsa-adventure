export const LEETCODE_PROBLEMS = [
  // ─── ARRAYS ───────────────────────────────────────────────────────────────
  {
    id: 'lc1929',
    topicKey: 'arrays',
    number: 1929,
    title: 'Concatenation of Array',
    difficulty: 'Easy',
    story: 'Your best friend made a party playlist of their favorite songs and wants to play it twice in a row so no one has to restart it. You need to build the doubled playlist.',
    problem: 'Given an array nums of length n, return a new array of length 2n where nums appears twice: first at positions 0 to n-1, then again at positions n to 2n-1.\n\nExample:\nInput: nums = [1, 2, 1]\nOutput: [1, 2, 1, 1, 2, 1]',
    walkthrough: 'First ask yourself: what does the output look like? It is just nums played twice. So:\n1. Create an empty result list.\n2. Loop through nums once and add each element.\n3. Loop through nums a second time and add each element again.\n4. Return the result.\n\nOr even simpler: notice that result = nums + nums in Python!',
    hint: 'In Python, you can concatenate two lists with the + operator. What happens if you write nums + nums?',
    solution: `def getConcatenation(nums):
    # The result is simply nums repeated twice
    # Python list concatenation with + does this in one line
    return nums + nums

# Alternative: build it manually
def getConcatenation_v2(nums):
    n = len(nums)                    # length of original array
    result = []                       # start with empty list
    for i in range(2 * n):           # go through 2n indices
        result.append(nums[i % n])   # i % n wraps back to start
    return result`,
    complexity: 'Time O(n) — we copy n elements twice. Space O(n) — result has 2n elements.',
    quiz: [
      {
        type: 'mcq',
        question: 'What is the time complexity of returning nums + nums?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        answer: 1,
        explanation: 'Copying n elements takes O(n) time.'
      },
      {
        type: 'output',
        question: 'What does this code output?\n\nnums = [3, 5]\nprint(nums + nums)',
        options: ['[3, 5]', '[6, 10]', '[3, 5, 3, 5]', '[3, 3, 5, 5]'],
        answer: 2,
        explanation: 'List concatenation appends the second list after the first.'
      },
      {
        type: 'fillin',
        question: 'Complete the function:\n\ndef getConcatenation(nums):\n    return nums _____ nums',
        options: ['*', '+', '&', '|'],
        answer: 1,
        explanation: 'The + operator concatenates two lists in Python.'
      },
    ],
  },
  {
    id: 'lc1480',
    topicKey: 'arrays',
    number: 1480,
    title: 'Running Sum of 1d Array',
    difficulty: 'Easy',
    story: 'You are keeping score in a card game. After each round, you want to know the total score so far, not just the points from that round.',
    problem: 'Given an array nums, return the running sum where running_sum[i] = sum(nums[0] + ... + nums[i]).\n\nExample:\nInput: nums = [1, 2, 3, 4]\nOutput: [1, 3, 6, 10]',
    walkthrough: 'Think about it step by step:\n1. Start with a total = 0 and an empty result list.\n2. For each number in nums, add it to total.\n3. Append the new total to result.\n4. After the loop, result holds all the running totals.\n\nOr: modify nums in place — add each element to the previous one.',
    hint: 'At each position i, the running sum is just the previous running sum plus nums[i]. What if you updated nums[i] directly?',
    solution: `def runningSum(nums):
    result = []                      # store our running totals
    total = 0                        # keep a running total
    for num in nums:                 # go through each number
        total += num                 # add current number to total
        result.append(total)         # record the current total
    return result

# Even cleaner: in-place modification
def runningSum_v2(nums):
    for i in range(1, len(nums)):    # start at index 1
        nums[i] += nums[i-1]         # add previous running sum
    return nums`,
    complexity: 'Time O(n) — one pass through the array. Space O(n) for result (O(1) if in-place).',
    quiz: [
      {
        type: 'mcq',
        question: 'For nums = [3, 1, 2], what is the running sum at index 2?',
        options: ['2', '4', '6', '3'],
        answer: 2,
        explanation: '3 + 1 + 2 = 6. Running sum at index 2 is the sum of all elements up to and including index 2.'
      },
      {
        type: 'output',
        question: 'What does this output?\n\nnums = [1, 1, 1, 1, 1]\nfor i in range(1, len(nums)):\n    nums[i] += nums[i-1]\nprint(nums)',
        options: ['[1,1,1,1,1]', '[1,2,3,4,5]', '[2,2,2,2,2]', '[5,5,5,5,5]'],
        answer: 1,
        explanation: 'Each element becomes the sum of all previous elements including itself: 1,1+1,1+1+1,...'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\ndef runningSum(nums):\n    for i in range(1, len(nums)):\n        nums[i] += nums[___]\n    return nums',
        options: ['i', 'i+1', 'i-1', '0'],
        answer: 2,
        explanation: 'nums[i-1] holds the running sum up to the previous index.'
      },
    ],
  },
  {
    id: 'lc121',
    topicKey: 'arrays',
    number: 121,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    story: 'You have a magic newspaper that shows you stock prices for the next 7 days. You can buy the stock on one day and sell it on a future day. Find the maximum profit you can make!',
    problem: 'Given an array prices where prices[i] is the price on day i, return the maximum profit from one buy and one sell. You must buy before you sell.\n\nExample:\nInput: prices = [7, 1, 5, 3, 6, 4]\nOutput: 5 (buy at 1, sell at 6)',
    walkthrough: 'Key insight: to maximize profit, you want to buy as low as possible and sell as high as possible AFTER buying.\n1. Track the minimum price seen so far (best buy price).\n2. At each day, calculate profit = today\'s price - minimum so far.\n3. Track the maximum profit seen across all days.\n\nYou never need to look back — just track the running minimum.',
    hint: 'As you walk through prices left to right, ask: "If I bought at the cheapest price I have seen so far, how much profit would I make today?" Keep updating the max profit.',
    solution: `def maxProfit(prices):
    min_price = float('inf')    # start with impossibly high buy price
    max_profit = 0              # haven't made any profit yet

    for price in prices:
        if price < min_price:
            min_price = price   # found a better buy day!
        profit = price - min_price  # profit if we sell today
        if profit > max_profit:
            max_profit = profit # new best profit found!

    return max_profit`,
    complexity: 'Time O(n) — one pass. Space O(1) — only track two variables.',
    quiz: [
      {
        type: 'mcq',
        question: 'For prices = [7,6,4,3,1], what is the max profit?',
        options: ['0', '1', '3', '6'],
        answer: 0,
        explanation: 'Prices only go down, so the best strategy is not to trade. Profit = 0.'
      },
      {
        type: 'output',
        question: 'What is max_profit after this runs?\n\nprices = [2, 4, 1, 7]\nmin_price = float("inf")\nmax_profit = 0\nfor p in prices:\n    min_price = min(min_price, p)\n    max_profit = max(max_profit, p - min_price)',
        options: ['5', '6', '7', '3'],
        answer: 1,
        explanation: 'Buy at 1, sell at 7 → profit = 6. min_price becomes 1 when we hit it, then p-min_price = 7-1 = 6.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\ndef maxProfit(prices):\n    min_price = float("inf")\n    max_profit = 0\n    for price in prices:\n        min_price = min(min_price, ___)\n        max_profit = max(max_profit, price - min_price)\n    return max_profit',
        options: ['max_profit', 'price', '0', 'prices[0]'],
        answer: 1,
        explanation: 'We update min_price to be the minimum of the current min and the current price.'
      },
    ],
  },

  // ─── STACKS ────────────────────────────────────────────────────────────────
  {
    id: 'lc20',
    topicKey: 'stacks',
    number: 20,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    story: 'You are proofreading a math textbook and need to check that every opening bracket has a matching closing bracket in the right order. Mismatched brackets confuse students!',
    problem: 'Given a string s containing only \'(\', \')\', \'{\', \'}\', \'[\', \']\', determine if the input string is valid. Every open bracket must be closed by the same type of bracket in the correct order.\n\nExamples:\n"()" → true\n"()[]{}" → true\n"(]" → false\n"([)]" → false',
    walkthrough: 'The key insight: the most recently opened bracket must be closed first (LIFO = stack!).\n1. Walk through each character.\n2. If it is an opener ( { [ push it onto the stack.\n3. If it is a closer ) } ] check: does it match the TOP of the stack?\n   - If yes, pop the stack and continue.\n   - If no (wrong type or empty stack), return False.\n4. At the end, the stack must be empty (all brackets matched).',
    hint: 'When you see a closing bracket, it must match the MOST RECENT opening bracket. Which data structure gives you the most recent item instantly?',
    solution: `def isValid(s):
    stack = []                           # stores unmatched openers
    matching = {')': '(', '}': '{', ']': '['}  # closer → opener map

    for char in s:
        if char in '({[':                # it's an opener
            stack.append(char)           # push onto stack
        else:                            # it's a closer
            if not stack:               # nothing to match with
                return False
            if stack[-1] != matching[char]:  # top doesn't match
                return False
            stack.pop()                  # matched! remove opener

    return len(stack) == 0               # must be no unmatched openers`,
    complexity: 'Time O(n) — one pass. Space O(n) — worst case all openers.',
    quiz: [
      {
        type: 'mcq',
        question: 'What does isValid("({[]})")  return?',
        options: ['True', 'False', 'Error', '0'],
        answer: 0,
        explanation: 'Each bracket is properly nested and matched. Stack: ( → ({ → ({[ → ({ after ] → ( after } → empty after ). True!'
      },
      {
        type: 'output',
        question: 'After processing "(([", what is in the stack?',
        options: ["['(']", "['(','(','[']", "['(','[']", '[]'],
        answer: 1,
        explanation: 'Each opener is pushed: push (, push (, push [.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nmatching = {")": "(", "}": "{", "]": "["}\nif stack[-1] != matching[___]:\n    return False\nstack.pop()',
        options: ['stack[-1]', 'char', 'stack[0]', 'matching'],
        answer: 1,
        explanation: 'We look up the expected opener for the current closing character (char).'
      },
    ],
  },
  {
    id: 'lc155',
    topicKey: 'stacks',
    number: 155,
    title: 'Min Stack',
    difficulty: 'Medium',
    story: 'Design a scoreboard for a competition that can instantly tell you the current lowest score, even as scores are added and removed from the top.',
    problem: 'Design a stack that supports push, pop, top, and getMin in O(1) time.\n\nImplement MinStack:\n- push(val) — pushes val\n- pop() — removes top\n- top() — returns top element\n- getMin() — returns minimum element\n\nAll operations must be O(1).',
    walkthrough: 'The trick: when you push a value, also remember what the minimum was AT THAT POINT. Use two stacks!\n1. Main stack: stores all values normally.\n2. Min stack: stores the current minimum EACH TIME we push.\n\nWhen we push 5 and current min is 3, push 5 to main and push 3 to min stack.\nWhen we pop, pop from BOTH stacks.\ngetMin() just looks at the top of the min stack!',
    hint: 'What if every position in the stack remembered what the minimum was at that point in time? A second parallel stack could track this.',
    solution: `class MinStack:
    def __init__(self):
        self.stack = []       # main stack: all values
        self.min_stack = []   # min stack: current min at each push

    def push(self, val):
        self.stack.append(val)              # push to main stack
        # push current min to min stack
        if self.min_stack:
            self.min_stack.append(min(val, self.min_stack[-1]))
        else:
            self.min_stack.append(val)       # first element is the min

    def pop(self):
        self.stack.pop()           # pop from both stacks together
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]      # just peek at main stack top

    def getMin(self):
        return self.min_stack[-1]  # min at current stack depth`,
    complexity: 'All operations O(1). Space O(n) for two stacks.',
    quiz: [
      {
        type: 'mcq',
        question: 'After push(3), push(5), push(2), push(4), what does getMin() return?',
        options: ['2', '3', '4', '5'],
        answer: 0,
        explanation: 'Min stack after each push: [3], [3,3], [3,3,2], [3,3,2,2]. Top of min stack = 2.'
      },
      {
        type: 'output',
        question: 'After push(2), push(0), pop(), what does getMin() return?',
        options: ['0', '2', '-1', 'Error'],
        answer: 1,
        explanation: 'After pop() removes 0, the remaining elements are just [2]. getMin() returns 2.'
      },
      {
        type: 'fillin',
        question: 'Complete getMin:\n\ndef getMin(self):\n    return self.___[-1]',
        options: ['stack', 'min_stack', 'vals', 'mins'],
        answer: 1,
        explanation: 'The min_stack always has the current minimum at its top.'
      },
    ],
  },

  // ─── QUEUES ────────────────────────────────────────────────────────────────
  {
    id: 'lc933',
    topicKey: 'queues',
    number: 933,
    title: 'Number of Recent Calls',
    difficulty: 'Easy',
    story: 'A popular app wants to show a "trending" indicator that lights up when 3 or more people tap a button within the last 3 seconds. How many taps happened recently?',
    problem: 'Implement RecentCounter: ping(t) adds a new request at time t and returns the number of requests in the range [t-3000, t].\n\nt is guaranteed to be strictly increasing.\n\nExample:\nping(1) → 1\nping(100) → 2\nping(3001) → 3\nping(3002) → 3 (request at t=1 is now too old)',
    walkthrough: 'A sliding window of the last 3000 milliseconds:\n1. Add the new timestamp t to a queue.\n2. Remove from the FRONT of the queue any timestamps older than t-3000.\n3. The length of the queue is how many requests are in the window.\n\nA deque is perfect: add to back, remove from front, both O(1).',
    hint: 'Old timestamps are always at the FRONT of the queue (since t is always increasing). Which end of a queue do you remove from?',
    solution: `from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()               # stores recent timestamps

    def ping(self, t: int) -> int:
        self.q.append(t)               # add new request timestamp

        # remove timestamps older than t - 3000
        while self.q[0] < t - 3000:
            self.q.popleft()           # too old, remove from front

        return len(self.q)             # count of recent requests`,
    complexity: 'Time O(1) amortized — each timestamp is added and removed at most once. Space O(n) for the window.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why do we use deque instead of a list?',
        options: ['deque is faster to sort', 'deque popleft() is O(1), list popleft is O(n)', 'deque uses less memory', 'lists do not support append'],
        answer: 1,
        explanation: 'We remove from the front repeatedly. List.pop(0) shifts all elements — O(n). deque.popleft() is O(1).'
      },
      {
        type: 'output',
        question: 'After ping(1), ping(100), ping(3001), ping(3002), what is the queue?',
        options: ['[1,100,3001,3002]', '[100,3001,3002]', '[3001,3002]', '[3002]'],
        answer: 1,
        explanation: 'After ping(3002): t-3000=2, so 1 is removed (1 < 2). 100 ≥ 2, so it stays. Queue = [100, 3001, 3002].'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nwhile self.q[0] < t - ___:\n    self.q.popleft()',
        options: ['1000', '3000', '300', '30000'],
        answer: 1,
        explanation: 'The window is 3000 milliseconds wide.'
      },
    ],
  },

  // ─── LINKED LISTS ──────────────────────────────────────────────────────────
  {
    id: 'lc206',
    topicKey: 'linkedlists',
    number: 206,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    story: 'You have a train with 5 cars linked together heading east. The company needs it to head west. You cannot detach the cars — you can only change which direction each car faces.',
    problem: 'Given the head of a linked list, reverse the list and return the new head.\n\nExample:\nInput: 1 → 2 → 3 → 4 → 5 → None\nOutput: 5 → 4 → 3 → 2 → 1 → None',
    walkthrough: 'Use three pointers: prev, curr, and next_node.\n1. Start: prev = None, curr = head.\n2. At each step:\n   - Save next_node = curr.next (so we don\'t lose the rest of the list).\n   - Flip the arrow: curr.next = prev (point backward).\n   - Advance: prev = curr, curr = next_node.\n3. When curr is None, prev is the new head.',
    hint: 'Think of flipping arrows one at a time. You need to remember where you came from (prev) and where to go next (save next before you flip the arrow).',
    solution: `def reverseList(head):
    prev = None          # the new "tail" starts pointing to nothing
    curr = head          # start at the beginning

    while curr:
        next_node = curr.next    # save next before we overwrite it!
        curr.next = prev         # FLIP the arrow to point backward
        prev = curr              # advance prev one step
        curr = next_node         # advance curr one step

    return prev                  # curr is None, prev is new head

# Recursive version (good to know for interviews)
def reverseList_recursive(head):
    if not head or not head.next:
        return head                         # base case: 0 or 1 nodes
    new_head = reverseList_recursive(head.next)  # reverse the rest
    head.next.next = head                   # point next node back to head
    head.next = None                        # head is now the tail
    return new_head`,
    complexity: 'Time O(n) — visit each node once. Space O(1) iterative, O(n) recursive stack.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why do we save next_node = curr.next before flipping curr.next?',
        options: ['To sort the list', 'Because flipping curr.next would lose our only reference to the rest of the list', 'To check if the list is circular', 'It is not needed'],
        answer: 1,
        explanation: 'Once we set curr.next = prev, we lose the pointer to the next node. We must save it first!'
      },
      {
        type: 'output',
        question: 'After reversing 1→2→3, what is prev after the while loop?',
        options: ['Node(1)', 'Node(2)', 'Node(3)', 'None'],
        answer: 2,
        explanation: 'The last node processed becomes the new head. prev ends up at Node(3) which now points to 2→1→None.'
      },
      {
        type: 'fillin',
        question: 'Complete the reversal step:\n\nnext_node = curr.next\ncurr.next = ___\nprev = curr\ncurr = next_node',
        options: ['curr', 'next_node', 'prev', 'None'],
        answer: 2,
        explanation: 'We flip the arrow to point to prev (the previous node, which becomes the next in reversed order).'
      },
    ],
  },
  {
    id: 'lc141',
    topicKey: 'linkedlists',
    number: 141,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    story: 'Two runners start at the same spot on a track. One runs fast (2 steps) and one runs slow (1 step). If the track has a loop, the fast runner will eventually lap the slow one and they will meet!',
    problem: 'Given the head of a linked list, return true if it contains a cycle (a node points back to an earlier node).\n\nConstraint: Use O(1) memory (no hash set allowed).',
    walkthrough: 'Floyd\'s Cycle Detection (tortoise and hare):\n1. slow pointer moves 1 step at a time.\n2. fast pointer moves 2 steps at a time.\n3. If there is a cycle: fast laps slow, and they MUST meet at the same node.\n4. If there is no cycle: fast reaches None before they meet.\n\nMath fact: in a cycle of length L, they meet within L steps.',
    hint: 'Imagine two people running on a circular track. The faster person will eventually catch up to the slower one. What happens in a straight track with no loop?',
    solution: `def hasCycle(head):
    slow = head         # tortoise: moves 1 step
    fast = head         # hare: moves 2 steps

    while fast and fast.next:  # need 2 steps available for fast
        slow = slow.next             # tortoise: 1 step
        fast = fast.next.next        # hare: 2 steps

        if slow == fast:             # they met! cycle exists
            return True

    return False                     # fast reached end → no cycle`,
    complexity: 'Time O(n). Space O(1) — only two pointers, no extra storage.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why does fast pointer need fast.next to also be non-None?',
        options: ['For speed', 'fast.next.next needs fast.next to exist first', 'Slow could overtake fast', 'It does not'],
        answer: 1,
        explanation: 'fast moves to fast.next.next. If fast.next is None, fast.next.next would crash. We check both.'
      },
      {
        type: 'output',
        question: 'On a list 1→2→3→4→None (no cycle), where does fast end up?',
        options: ['Node(4)', 'None', 'Node(3)', 'Node(1)'],
        answer: 1,
        explanation: 'With no cycle, fast will reach None (or fast.next will be None), and the while loop exits. We return False.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nslow = slow.next\nfast = fast.___.___',
        options: ['next, next', 'prev, next', 'next, prev', 'val, next'],
        answer: 0,
        explanation: 'fast moves two steps: first to fast.next, then to fast.next.next.'
      },
    ],
  },

  // ─── HASH TABLES ───────────────────────────────────────────────────────────
  {
    id: 'lc1',
    topicKey: 'hashtables',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    story: 'At a school bake sale, you have a budget of exactly $10. You want to buy exactly two cookies whose prices add up to your budget. Which two cookies should you pick?',
    problem: 'Given an array nums and a target, return the indices of the two numbers that add up to target. Each input has exactly one solution.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)',
    walkthrough: 'Brute force checks every pair — O(n²). Too slow! Hash table approach:\n1. Create an empty dictionary called seen.\n2. For each number at index i:\n   - Calculate complement = target - num.\n   - If complement is in seen, we found our pair! Return [seen[complement], i].\n   - Otherwise, store num in seen: seen[num] = i.\n\nKey insight: instead of searching for the complement, we remember what we\'ve seen.',
    hint: 'For each number, ask "what number would I need to reach the target?" Then check if you\'ve already seen that number in a dictionary.',
    solution: `def twoSum(nums, target):
    seen = {}               # maps number → its index

    for i, num in enumerate(nums):
        complement = target - num     # what do we need to reach target?

        if complement in seen:        # have we seen it before?
            return [seen[complement], i]   # yes! return both indices

        seen[num] = i                 # remember: we've seen num at index i

    return []   # guaranteed to find a solution per problem statement`,
    complexity: 'Time O(n) — one pass with O(1) lookups. Space O(n) for the hash map.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why is the hash map approach O(n) instead of O(n²)?',
        options: ['We only loop once and dict lookup is O(1)', 'We sort first', 'We use binary search', 'We skip duplicates'],
        answer: 0,
        explanation: 'One loop = O(n). Each dict lookup = O(1). Total = O(n) vs O(n²) for checking every pair.'
      },
      {
        type: 'output',
        question: 'For nums=[3,2,4], target=6, what does twoSum return?',
        options: ['[0,1]', '[1,2]', '[0,2]', '[2,3]'],
        answer: 1,
        explanation: 'nums[1]=2 and nums[2]=4. 2+4=6. At i=2, complement=2, seen={3:0,2:1}, 2 is in seen. Return [1,2].'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nfor i, num in enumerate(nums):\n    complement = ___ - num\n    if complement in seen:\n        return [seen[complement], i]\n    seen[num] = i',
        options: ['num', 'i', 'target', 'len(nums)'],
        answer: 2,
        explanation: 'The complement is target minus the current number.'
      },
    ],
  },
  {
    id: 'lc242',
    topicKey: 'hashtables',
    number: 242,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    story: 'A word puzzle: "listen" and "silent" use exactly the same letters, just rearranged. Can you check if two words are anagrams without sorting them?',
    problem: 'Given two strings s and t, return true if t is an anagram of s.\n\nAn anagram uses all the same letters the same number of times.\n\nExamples:\n"anagram", "nagaram" → true\n"rat", "car" → false',
    walkthrough: 'Letter counting approach:\n1. If lengths differ, immediately return False.\n2. Count each letter in s using a dictionary.\n3. For each letter in t, decrement its count.\n4. If any count goes below 0, t has a letter s doesn\'t. Return False.\n5. If we get through all of t, they match — return True.',
    hint: 'What if you counted how many times each letter appears in both words and compared the counts? You only need one pass through each word.',
    solution: `def isAnagram(s, t):
    if len(s) != len(t):        # quick check: different lengths can't be anagrams
        return False

    count = {}                   # letter → count

    for char in s:               # count up letters in s
        count[char] = count.get(char, 0) + 1

    for char in t:               # subtract letters in t
        if char not in count:
            return False         # t has a letter s doesn't have
        count[char] -= 1
        if count[char] < 0:
            return False         # t uses this letter more times than s

    return True                  # all counts balanced

# Cleaner with Counter
from collections import Counter
def isAnagram_v2(s, t):
    return Counter(s) == Counter(t)`,
    complexity: 'Time O(n). Space O(1) — at most 26 keys (alphabet size is constant).',
    quiz: [
      {
        type: 'mcq',
        question: 'Why do we check len(s) != len(t) first?',
        options: ['Sorting requirement', 'Different lengths cannot be anagrams — early exit saves time', 'Python requires it', 'To avoid KeyError'],
        answer: 1,
        explanation: 'Anagrams must use the same letters same number of times → same length. This early exit is O(1).'
      },
      {
        type: 'output',
        question: 'What does Counter("aab") == Counter("baa") evaluate to?',
        options: ['True', 'False', 'Error', '{"a":2,"b":1}'],
        answer: 0,
        explanation: 'Both have Counter({"a":2,"b":1}). Counters are equal, so True.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\ncount[char] = count.___(char, 0) + 1',
        options: ['find', 'get', 'index', 'fetch'],
        answer: 1,
        explanation: 'dict.get(key, default) returns the value if key exists, otherwise returns the default (0 here).'
      },
    ],
  },
  {
    id: 'lc49',
    topicKey: 'hashtables',
    number: 49,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    story: 'A librarian receives a pile of index cards with words and needs to group all the cards that are anagrams of each other into separate piles.',
    problem: 'Given an array of strings strs, group the anagrams together.\n\nExample:\nInput: ["eat","tea","tan","ate","nat","bat"]\nOutput: [["eat","tea","ate"],["tan","nat"],["bat"]]',
    walkthrough: 'The key insight: two strings are anagrams if and only if their SORTED letters are identical! "eat" sorted = "aet", "tea" sorted = "aet" — same!\n1. Create a defaultdict of lists.\n2. For each word, sort its letters to get a canonical key.\n3. Append the word to the bucket for that key.\n4. Return all buckets as a list.',
    hint: 'Anagrams have the same letters in possibly different orders. What happens if you sort the letters of two anagrams? They become identical — perfect dictionary key!',
    solution: `from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)    # key: sorted letters, value: list of words

    for word in strs:
        key = "".join(sorted(word))   # sort letters: "eat" → "aet"
        groups[key].append(word)      # add word to its anagram group

    return list(groups.values())   # return all groups as a list

# Example trace:
# "eat" → key "aet" → groups["aet"] = ["eat"]
# "tea" → key "aet" → groups["aet"] = ["eat", "tea"]
# "tan" → key "ant" → groups["ant"] = ["tan"]
# "ate" → key "aet" → groups["aet"] = ["eat", "tea", "ate"]
# "nat" → key "ant" → groups["ant"] = ["tan", "nat"]
# "bat" → key "abt" → groups["abt"] = ["bat"]`,
    complexity: 'Time O(n·k log k) where k = max word length. Space O(n·k).',
    quiz: [
      {
        type: 'mcq',
        question: 'What is the sorted key for "cinema"?',
        options: ['cinema', 'aceiimn', 'aceimn', 'animce'],
        answer: 2,
        explanation: 'sorted("cinema") = ["a","c","e","i","m","n"] → joined = "aceimn".'
      },
      {
        type: 'output',
        question: 'What does "".join(sorted("bat")) return?',
        options: ['"bat"', '"tab"', '"abt"', '"bta"'],
        answer: 2,
        explanation: 'sorted("bat") = ["a","b","t"], joined = "abt".'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nkey = "".join(___(word))\ngroups[key].append(word)',
        options: ['reversed', 'sorted', 'set', 'list'],
        answer: 1,
        explanation: 'sorted() gives us the canonical alphabetical form of the word\'s letters.'
      },
    ],
  },

  // ─── TREES ─────────────────────────────────────────────────────────────────
  {
    id: 'lc104',
    topicKey: 'trees',
    number: 104,
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    story: 'You are a scientist measuring the tallest branch of a tree in a forest. You want to know: how many levels does the deepest branch go from the trunk?',
    problem: 'Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).\n\nExample:\n    3\n   / \\\n  9  20\n    /  \\\n   15   7\nOutput: 3',
    walkthrough: 'Think recursively! Each node asks its children:\n1. "Hey left child, what\'s your depth?"\n2. "Hey right child, what\'s your depth?"\n3. My depth = 1 + max(left_depth, right_depth).\n\nBase case: if node is None, depth = 0 (empty subtree contributes nothing).',
    hint: 'The max depth of any tree = 1 (for the current node) plus the maximum depth of its deeper subtree. Think recursively!',
    solution: `def maxDepth(root):
    if not root:                            # empty tree or leaf's child
        return 0

    left_depth  = maxDepth(root.left)       # ask left subtree its depth
    right_depth = maxDepth(root.right)      # ask right subtree its depth

    return 1 + max(left_depth, right_depth) # current node adds 1 level

# BFS version — count levels
from collections import deque
def maxDepth_bfs(root):
    if not root:
        return 0
    depth = 0
    queue = deque([root])
    while queue:
        depth += 1                          # each iteration = one level
        for _ in range(len(queue)):         # process all nodes at this level
            node = queue.popleft()
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
    return depth`,
    complexity: 'Time O(n) — visit every node. Space O(h) for recursion stack, O(n) worst case (skewed).',
    quiz: [
      {
        type: 'mcq',
        question: 'What does maxDepth return for a tree with just the root node?',
        options: ['0', '1', '2', 'None'],
        answer: 1,
        explanation: 'Root is not None, left and right are both None (return 0). 1 + max(0,0) = 1.'
      },
      {
        type: 'output',
        question: 'For a tree 1→(2,3)→(4,None,None,None), what is maxDepth?',
        options: ['1', '2', '3', '4'],
        answer: 2,
        explanation: 'Levels: root (1), then 2 and 3, then 4 under 2. Longest path: 1→2→4 = depth 3.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nreturn ___ + max(maxDepth(root.left), maxDepth(root.right))',
        options: ['0', '1', '2', 'root.val'],
        answer: 1,
        explanation: 'The current node itself adds 1 to the depth.'
      },
    ],
  },
  {
    id: 'lc226',
    topicKey: 'trees',
    number: 226,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    story: 'Hold a family tree poster up to a mirror. The left side becomes the right, the right becomes the left — and this flip happens at every level of the tree!',
    problem: 'Given the root of a binary tree, invert the tree and return its root.\n\nExample:\n    4          4\n   / \\   →   / \\\n  2   7     7   2\n / \\ / \\   / \\ / \\\n1  3 6  9 9  6 3  1',
    walkthrough: 'This is beautifully recursive:\n1. If root is None, return None (base case).\n2. Swap root.left and root.right.\n3. Recursively invert the (now-swapped) left subtree.\n4. Recursively invert the (now-swapped) right subtree.\n5. Return root.\n\nEvery node mirrors its children!',
    hint: 'At each node, swap its left and right children. Then do the same for all descendants. Sounds recursive!',
    solution: `def invertTree(root):
    if not root:               # base case: nothing to invert
        return None

    # Swap left and right children
    root.left, root.right = root.right, root.left

    # Recursively invert both subtrees
    invertTree(root.left)
    invertTree(root.right)

    return root

# BFS (iterative) version
from collections import deque
def invertTree_bfs(root):
    if not root:
        return root
    queue = deque([root])
    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left  # swap
        if node.left:  queue.append(node.left)
        if node.right: queue.append(node.right)
    return root`,
    complexity: 'Time O(n) — visit every node once. Space O(h) recursion stack.',
    quiz: [
      {
        type: 'mcq',
        question: 'After inverting, what is true about the result?',
        options: ['It is sorted', 'Every node\'s children are swapped', 'Left subtree > right subtree', 'It becomes a BST'],
        answer: 1,
        explanation: 'Inverting means swapping left and right children at every node in the tree.'
      },
      {
        type: 'output',
        question: 'Inverting a tree with just root=1, left=2, right=3 — what is root.left.val after?',
        options: ['1', '2', '3', 'None'],
        answer: 2,
        explanation: 'After swap: root.left = old root.right = Node(3). So root.left.val = 3.'
      },
      {
        type: 'fillin',
        question: 'Complete the swap line:\n\nroot.left, root.right = root.___, root.___',
        options: ['left, right', 'right, left', 'val, next', 'right, right'],
        answer: 1,
        explanation: 'Python tuple unpacking: new root.left = old root.right, new root.right = old root.left.'
      },
    ],
  },

  // ─── BST ───────────────────────────────────────────────────────────────────
  {
    id: 'lc700',
    topicKey: 'bst',
    number: 700,
    title: 'Search in a Binary Search Tree',
    difficulty: 'Easy',
    story: 'In a magic library, all smaller books are on the left shelf and all bigger books are on the right shelf at every section. You can find any book super fast without checking all of them!',
    problem: 'Given the root of a BST and a value, return the node whose value equals val, or null if not found.\n\nExample:\nTree: 4→(2,7)→(1,3,None,None)\nSearch for 2: return the subtree rooted at 2.',
    walkthrough: 'Use the BST property at each step:\n1. If root is None → not found, return None.\n2. If root.val == val → found it! Return this node.\n3. If val < root.val → val must be in the LEFT subtree.\n4. If val > root.val → val must be in the RIGHT subtree.\n\nThis is the "hotter/colder" game!',
    hint: 'At each node, the BST property tells you exactly which direction to go. You never need to check both directions!',
    solution: `def searchBST(root, val):
    if not root:                     # hit empty spot: not found
        return None

    if root.val == val:              # found it!
        return root

    if val < root.val:               # target is smaller: go left
        return searchBST(root.left, val)
    else:                            # target is bigger: go right
        return searchBST(root.right, val)

# Iterative version (no recursion stack)
def searchBST_iterative(root, val):
    while root:
        if root.val == val:
            return root
        elif val < root.val:
            root = root.left    # go left
        else:
            root = root.right   # go right
    return None                 # not found`,
    complexity: 'Time O(log n) balanced, O(n) worst (skewed). Space O(log n) recursion.',
    quiz: [
      {
        type: 'mcq',
        question: 'In a BST with 1 million nodes, how many comparisons does search need?',
        options: ['1,000,000', '~20', '500,000', '1'],
        answer: 1,
        explanation: 'log₂(1,000,000) ≈ 20. Each step eliminates half the remaining possibilities.'
      },
      {
        type: 'output',
        question: 'Searching for 5 in BST [4,2,7,1,3]: which direction do you go first?',
        options: ['Left (smaller)', 'Right (bigger)', 'Stop (found)', 'Both'],
        answer: 1,
        explanation: '5 > 4 (root), so we go RIGHT to node 7.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nif val < root.val:\n    return searchBST(root.___, val)\nelse:\n    return searchBST(root.___, val)',
        options: ['right, left', 'left, right', 'left, left', 'right, right'],
        answer: 1,
        explanation: 'If val is smaller, go left. If val is larger, go right.'
      },
    ],
  },
  {
    id: 'lc98',
    topicKey: 'bst',
    number: 98,
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    story: 'A sneaky student claims their messy notebook is sorted. You check nearby pages and they look fine — but hidden in the back, entries are out of order! How do you catch the lie?',
    problem: 'Given the root of a binary tree, determine if it is a valid BST.\n\nA valid BST: left subtree has only nodes less than the node, right subtree has only nodes greater, and both subtrees are also valid BSTs.',
    walkthrough: 'The trap: checking only immediate children is not enough! A node deep in the right subtree might violate the root\'s constraint.\n\nSolution: pass valid RANGE (min, max) to each node:\n1. Root can be anything: range (-inf, +inf).\n2. If we go LEFT from root (value 5): right boundary becomes 5. So left child must be in (-inf, 5).\n3. If we go RIGHT from root (value 5): left boundary becomes 5. So right child must be in (5, +inf).\n4. If any node is outside its allowed range → invalid!',
    hint: 'When you go left, you add an upper limit. When you go right, you add a lower limit. Pass these constraints DOWN as you recurse.',
    solution: `def isValidBST(root):
    def validate(node, min_val, max_val):
        if not node:
            return True                          # empty tree is valid

        if node.val <= min_val or node.val >= max_val:
            return False                         # outside allowed range!

        # Left subtree: upper bound tightens to node.val
        # Right subtree: lower bound tightens to node.val
        return (validate(node.left,  min_val,   node.val) and
                validate(node.right, node.val,  max_val))

    return validate(root, float('-inf'), float('inf'))`,
    complexity: 'Time O(n) — visit every node. Space O(h) recursion stack.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why isn\'t it enough to just check left.val < root.val < right.val at each node?',
        options: ['It is enough', 'A node in the right subtree might be smaller than the root\'s ancestor', 'Performance reasons', 'BST does not have that property'],
        answer: 1,
        explanation: 'A subtree might pass local checks but violate an ancestor\'s constraint — the range propagation catches this.'
      },
      {
        type: 'output',
        question: 'For the tree [5, 1, 4, null, null, 3, 6], is it a valid BST?',
        options: ['True', 'False', 'Error', 'None'],
        answer: 1,
        explanation: 'Root=5, right child=4. But 4 < 5 violates the BST property (right must be greater).'
      },
      {
        type: 'fillin',
        question: 'Complete the range check:\n\nif node.val <= ___ or node.val >= max_val:',
        options: ['0', 'max_val', 'min_val', 'root.val'],
        answer: 2,
        explanation: 'The node must be strictly greater than min_val and strictly less than max_val.'
      },
    ],
  },

  // ─── GRAPHS ────────────────────────────────────────────────────────────────
  {
    id: 'lc200',
    topicKey: 'graphs',
    number: 200,
    title: 'Number of Islands',
    difficulty: 'Medium',
    story: 'You have a treasure map where 1 means land and 0 means ocean. Count how many separate islands are on the map. Two land squares on the same island must be connected horizontally or vertically.',
    problem: 'Given an m×n grid of "1"s (land) and "0"s (water), return the number of islands.\n\nExample:\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1\nOutput: 3',
    walkthrough: 'DFS flood-fill approach:\n1. Walk through every cell in the grid.\n2. When you find a "1" (land): increment island count. Then DFS to flood-fill the entire island to "0" (so you don\'t count it again).\n3. The DFS visits all 4 neighbors (up, down, left, right) and turns each "1" to "0".\n4. When DFS ends, the whole island is marked visited.\n5. Continue scanning — next "1" found is a new island.',
    hint: 'Each time you find an unvisited land cell, it is the start of a new island. Use DFS to "sink" the whole island so you don\'t count it twice.',
    solution: `def numIslands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        # out of bounds or water or already visited
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
            return
        grid[r][c] = "0"       # mark as visited (sink the land)
        dfs(r+1, c)             # explore all 4 directions
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":    # found new island!
                count += 1
                dfs(r, c)            # flood-fill the whole island

    return count`,
    complexity: 'Time O(m×n) — every cell visited at most once. Space O(m×n) recursion stack.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why do we change grid[r][c] to "0" during DFS?',
        options: ['To delete the island', 'To mark land as visited so we don\'t count it twice', 'To free memory', 'DFS requires it'],
        answer: 1,
        explanation: 'Once visited, we mark "0" so future scans don\'t find it and create a duplicate island count.'
      },
      {
        type: 'output',
        question: 'For grid=[["1","1"],["1","1"]], how many islands?',
        options: ['1', '2', '3', '4'],
        answer: 0,
        explanation: 'All four 1s are connected. One DFS from (0,0) floods all four. Count = 1.'
      },
      {
        type: 'fillin',
        question: 'Complete the boundary check:\n\nif r < 0 or r >= rows or c < 0 or c >= ___ or grid[r][c] != "1":',
        options: ['rows', 'cols', 'len(grid)', '10'],
        answer: 1,
        explanation: 'We need to check c is within [0, cols-1], so c >= cols means out of bounds.'
      },
    ],
  },

  // ─── BINARY SEARCH ─────────────────────────────────────────────────────────
  {
    id: 'lc704',
    topicKey: 'binarysearch',
    number: 704,
    title: 'Binary Search',
    difficulty: 'Easy',
    story: 'I am thinking of a number between 1 and 1,000. After each guess, I tell you "higher" or "lower." What is the smartest strategy to find my number in as few guesses as possible?',
    problem: 'Given an integer array nums sorted in ascending order, and an integer target, return the index of target or -1 if not found.\n\nMust be O(log n) time complexity.\n\nExample:\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4',
    walkthrough: 'Classic binary search:\n1. Start with left=0 and right=len-1.\n2. Find mid = (left+right)//2.\n3. If nums[mid] == target → return mid (found!).\n4. If target < nums[mid] → it must be left of mid. Set right = mid-1.\n5. If target > nums[mid] → it must be right of mid. Set left = mid+1.\n6. Repeat until left > right (not found).',
    hint: 'Always check the middle. If target is less than middle, ignore the right half. If greater, ignore the left half. Each step cuts your work in half!',
    solution: `def search(nums, target):
    left = 0
    right = len(nums) - 1          # search the full array

    while left <= right:           # while there are elements to check
        mid = (left + right) // 2  # find midpoint

        if nums[mid] == target:
            return mid             # found it!
        elif target < nums[mid]:
            right = mid - 1        # target in left half
        else:
            left = mid + 1         # target in right half

    return -1                      # not found`,
    complexity: 'Time O(log n). Space O(1).',
    quiz: [
      {
        type: 'mcq',
        question: 'How many comparisons for 1024 elements in the worst case?',
        options: ['1024', '512', '10', '32'],
        answer: 2,
        explanation: 'log₂(1024) = 10. Each step halves the search space.'
      },
      {
        type: 'output',
        question: 'Searching for 3 in [-1,0,3,5,9]: what is mid on the first iteration?',
        options: ['0', '1', '2', '3'],
        answer: 2,
        explanation: 'left=0, right=4, mid=(0+4)//2=2. nums[2]=3 → found!'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nif target < nums[mid]:\n    right = mid - ___\nelse:\n    left = mid + ___',
        options: ['0, 0', '1, 1', '2, 2', '1, 0'],
        answer: 1,
        explanation: 'We move right to mid-1 (exclude mid) or left to mid+1 (exclude mid) to avoid infinite loops.'
      },
    ],
  },
  {
    id: 'lc35',
    topicKey: 'binarysearch',
    number: 35,
    title: 'Search Insert Position',
    difficulty: 'Easy',
    story: 'You have a sorted alphabetical guest list. A new guest arrives whose name was not on the original list. Where should their name card be inserted to keep the list in alphabetical order?',
    problem: 'Given a sorted array nums and a target, return the index if found, or the index where it would be inserted to keep sorted order.\n\nExample:\nnums=[1,3,5,6], target=5 → 2\nnums=[1,3,5,6], target=2 → 1\nnums=[1,3,5,6], target=7 → 4',
    walkthrough: 'Run standard binary search. The magic: when the while loop ends (left > right), left is exactly where target should be inserted!\n\nWhy? When left > right, left points to the first element greater than target. Inserting at left keeps the array sorted.\n\nSame code as binary search — just return left instead of -1 at the end.',
    hint: 'Run binary search normally. If you find the target, return mid. If not found, notice where left ends up — it will be exactly the correct insertion position!',
    solution: `def searchInsert(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid             # found it!
        elif target < nums[mid]:
            right = mid - 1
        else:
            left = mid + 1

    return left    # when loop ends, left = correct insertion point

# Why does left work?
# When left > right, left is the first position where
# nums[left] > target (or left = len(nums) meaning insert at end)`,
    complexity: 'Time O(log n). Space O(1).',
    quiz: [
      {
        type: 'mcq',
        question: 'For nums=[1,3,5,6] and target=0, what is returned?',
        options: ['0', '-1', '1', '4'],
        answer: 0,
        explanation: 'Target 0 is less than all elements. Binary search leaves left=0. Insert at position 0.'
      },
      {
        type: 'output',
        question: 'For nums=[1,3,5,6] and target=7, what does the function return?',
        options: ['3', '4', '-1', '6'],
        answer: 1,
        explanation: 'Target 7 is larger than all elements. left ends at 4 (=len(nums)). Insert at the end.'
      },
      {
        type: 'fillin',
        question: 'The only change from regular binary search — what do we return when not found?\n\nreturn ___',
        options: ['-1', 'right', 'left', 'mid'],
        answer: 2,
        explanation: 'left is the correct insertion position when target is not found.'
      },
    ],
  },

  // ─── SORTING ───────────────────────────────────────────────────────────────
  {
    id: 'lc75',
    topicKey: 'mergesort',
    number: 75,
    title: 'Sort Colors',
    difficulty: 'Medium',
    story: 'You have a bag of marbles: red (0), white (1), and blue (2) all mixed together. Sort them so all reds are first, then whites, then blues — in one pass without using a sorting algorithm!',
    problem: 'Given an array nums with only values 0, 1, 2 (representing red, white, blue), sort it in-place in one pass.\n\nDo not use a library sort function.\n\nExample:\nInput: [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]',
    walkthrough: 'Dutch National Flag algorithm — three pointers:\n- low: boundary of the 0s zone (everything before low is 0)\n- mid: current element being examined\n- high: boundary of the 2s zone (everything after high is 2)\n\n1. If nums[mid] == 0: swap with nums[low], advance both low and mid.\n2. If nums[mid] == 1: it is in the right zone, just advance mid.\n3. If nums[mid] == 2: swap with nums[high], decrement high (do NOT advance mid — need to check swapped element!).',
    hint: 'Use three pointers to create three zones: 0s zone on the left, 2s zone on the right, 1s zone in the middle. Process each element and swap it to the right zone.',
    solution: `def sortColors(nums):
    low = 0                  # next position for a 0
    mid = 0                  # current element being processed
    high = len(nums) - 1     # next position for a 2

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]  # 0 goes to front
            low += 1
            mid += 1          # this element is now confirmed 0 or 1
        elif nums[mid] == 1:
            mid += 1          # 1 is already in the right zone
        else:                 # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]  # 2 goes to back
            high -= 1
            # do NOT increment mid — swapped element needs checking!

# This is O(n) time, O(1) space, single pass!`,
    complexity: 'Time O(n) single pass. Space O(1) in-place.',
    quiz: [
      {
        type: 'mcq',
        question: 'Why don\'t we increment mid after swapping with high?',
        options: ['Bug', 'The element swapped from high could be a 0 and needs checking', 'high is already sorted', 'We use low instead'],
        answer: 1,
        explanation: 'The element we get from nums[high] is unknown — it could be 0, 1, or 2. We need to examine it at current mid position.'
      },
      {
        type: 'output',
        question: 'After one iteration on [2,0,1] with low=mid=0, high=2: what is the array?',
        options: ['[2,0,1]', '[0,2,1]', '[1,0,2]', '[0,1,2]'],
        answer: 2,
        explanation: 'nums[mid]=2, swap with nums[high]: swap index 0 and 2 → [1,0,2]. high becomes 1. mid stays 0.'
      },
      {
        type: 'fillin',
        question: 'Complete:\n\nif nums[mid] == 0:\n    nums[low], nums[mid] = nums[mid], nums[low]\n    low += ___\n    mid += ___',
        options: ['0, 0', '1, 1', '2, 1', '1, 2'],
        answer: 1,
        explanation: 'Both low and mid advance by 1 after placing a 0 in the correct position.'
      },
    ],
  },
];
