export const TOPICS = [
  {
    key: 'arrays',
    name: 'Arrays',
    emoji: '📦',
    category: 'Data Structures',
    difficulty: 'Beginner',
    color: '#7c3aed',
    analogy: 'Row of school lockers — each has a number starting at 0',
    description: 'Arrays store items in a line. Each item has an index starting at zero. Think of numbered lockers at school!',
    concepts: [
      { title: 'What is an Array?', body: 'An array is like a row of numbered boxes. Each box holds one value. The first box is number 0, the second is 1, and so on.' },
      { title: 'Accessing Items', body: 'To grab something from box number 3, you write arr[3]. This is SUPER fast — O(1) — because the computer knows exactly where box 3 is!' },
      { title: 'Adding to the End', body: 'Appending to the end of an array is fast — O(1). Like putting a book on an empty shelf at the end of a row.' },
      { title: 'Inserting in the Middle', body: 'Inserting in the middle is slow — O(n) — because you have to shift everything else over, like moving all the lockers to make room.' },
      { title: 'Removing Items', body: 'Pop from the end is fast O(1). Removing from the middle is slow O(n) because items shift to fill the gap.' },
    ],
    code: `# Arrays in Python (lists)
arr = [10, 20, 30, 40, 50]  # create array

# Access — O(1)
print(arr[0])    # 10 (first element)
print(arr[2])    # 30 (third element)
print(arr[-1])   # 50 (last element)

# Append to end — O(1) amortized
arr.append(60)

# Insert at position — O(n)
arr.insert(1, 15)   # insert 15 at index 1

# Remove from end — O(1)
arr.pop()

# Remove from position — O(n)
arr.pop(0)          # remove first element

# Slice — O(k)
subset = arr[1:4]   # elements at index 1, 2, 3

# Length
print(len(arr))     # O(1)

# Loop — O(n)
for item in arr:
    print(item)`,
    timeComplexity: 'Access O(1) · Append O(1) · Insert/Delete O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'stacks',
    name: 'Stacks',
    emoji: '🥞',
    category: 'Data Structures',
    difficulty: 'Beginner',
    color: '#7c3aed',
    analogy: 'Stack of pancakes — last one added is first one eaten (LIFO)',
    description: 'A stack is LIFO — Last In, First Out. Like a stack of pancakes, you always eat the top one first.',
    concepts: [
      { title: 'What is a Stack?', body: 'A stack is a collection where you can only add or remove from the TOP. Like a pile of plates — you put plates on top and take from the top.' },
      { title: 'Push', body: 'Push means add to the top. Like flipping a new pancake onto the stack. In Python: stack.append(item).' },
      { title: 'Pop', body: 'Pop means remove from the top. Like eating the top pancake. In Python: stack.pop(). Fast — O(1).' },
      { title: 'Peek', body: 'Peek means look at the top WITHOUT removing it. Like checking what pancake is on top before eating. stack[-1] in Python.' },
      { title: 'Use Cases', body: 'Stacks are used to undo actions (Ctrl+Z), check balanced parentheses, and track function calls in programs.' },
    ],
    code: `# Stacks in Python (using a list)
stack = []

# Push — O(1)
stack.append(1)
stack.append(2)
stack.append(3)
# stack is now [1, 2, 3]

# Peek at top — O(1)
top = stack[-1]   # 3 (doesn't remove it)

# Pop — O(1)
item = stack.pop()  # returns 3, stack = [1, 2]
item = stack.pop()  # returns 2, stack = [1]

# Check if empty — O(1)
if not stack:
    print("Stack is empty!")

# Size — O(1)
print(len(stack))   # 1

# Real use: undo history
undo_stack = []
undo_stack.append("typed hello")
undo_stack.append("deleted world")
last_action = undo_stack.pop()  # undo last action`,
    timeComplexity: 'Push O(1) · Pop O(1) · Peek O(1)',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'queues',
    name: 'Queues',
    emoji: '🚶',
    category: 'Data Structures',
    difficulty: 'Beginner',
    color: '#7c3aed',
    analogy: 'Lunch line at school — first in, first served (FIFO)',
    description: 'A queue is FIFO — First In, First Out. Like waiting in line at lunch, the first person in line gets served first.',
    concepts: [
      { title: 'What is a Queue?', body: 'A queue is a line. The first person to join is the first to leave. Think of the lunch line at school — you cannot cut!' },
      { title: 'Enqueue', body: 'Enqueue means join the back of the line. In Python with deque: queue.append(item). Fast — O(1).' },
      { title: 'Dequeue', body: 'Dequeue means the front person leaves. In Python with deque: queue.popleft(). Fast — O(1).' },
      { title: 'Why deque?', body: 'A regular Python list is slow for removing from the front (O(n)). collections.deque is built for queues and is O(1) both ends.' },
      { title: 'Use Cases', body: 'Queues are used in printers (first job submitted prints first), BFS graph search, and scheduling tasks.' },
    ],
    code: `# Queues in Python (using collections.deque)
from collections import deque

queue = deque()

# Enqueue (add to back) — O(1)
queue.append("Alice")
queue.append("Bob")
queue.append("Charlie")
# queue: Alice → Bob → Charlie

# Peek at front — O(1)
front = queue[0]   # "Alice"

# Dequeue (remove from front) — O(1)
served = queue.popleft()  # "Alice"
served = queue.popleft()  # "Bob"

# queue now has: Charlie

# Check empty — O(1)
if not queue:
    print("No one in line!")

# Size
print(len(queue))  # 1

# Bonus: deque also lets you add/remove from both ends
queue.appendleft("VIP")   # add to front
queue.pop()               # remove from back`,
    timeComplexity: 'Enqueue O(1) · Dequeue O(1) · Peek O(1)',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'linkedlists',
    name: 'Linked Lists',
    emoji: '🔗',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    color: '#7c3aed',
    analogy: 'Treasure hunt — each clue tells you where the next clue is',
    description: 'A linked list is a chain of nodes. Each node holds a value AND a pointer to the next node. Like a treasure hunt!',
    concepts: [
      { title: 'What is a Node?', body: 'A node is a box with two things: a VALUE (the treasure) and a NEXT pointer (the clue to the next box). The last node points to None.' },
      { title: 'Head Pointer', body: 'The linked list only remembers the FIRST node, called the head. To find any other node, you must walk the chain from head.' },
      { title: 'Traversal', body: 'To visit every node: start at head, follow next pointers until None. This is O(n) — you must walk every step.' },
      { title: 'Insertion at Head', body: 'Adding to the front is fast — O(1)! Create new node, set its next to old head, update head to new node.' },
      { title: 'vs Arrays', body: 'Linked lists use more memory (store pointers too) but are great for inserting/deleting at the front. Arrays are better for random access.' },
    ],
    code: `# Linked List in Python

class Node:
    def __init__(self, val):
        self.val = val    # the value stored
        self.next = None  # pointer to next node

class LinkedList:
    def __init__(self):
        self.head = None  # start with empty list

    def append(self, val):        # add to end — O(n)
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while curr.next:          # walk to the end
            curr = curr.next
        curr.next = new_node      # attach at end

    def prepend(self, val):       # add to front — O(1)
        new_node = Node(val)
        new_node.next = self.head  # new node points to old head
        self.head = new_node       # update head

    def print_list(self):         # O(n)
        curr = self.head
        while curr:
            print(curr.val, end=" -> ")
            curr = curr.next
        print("None")

ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.prepend(0)
ll.print_list()   # 0 -> 1 -> 2 -> 3 -> None`,
    timeComplexity: 'Access O(n) · Prepend O(1) · Append O(n) · Delete O(n)',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'hashtables',
    name: 'Hash Tables',
    emoji: '🗝️',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    color: '#7c3aed',
    analogy: 'Magic filing cabinet — tell it a name, it finds the drawer instantly',
    description: 'Hash tables store key-value pairs. A magic function maps any key to a storage slot in O(1) time. Python dicts are hash tables!',
    concepts: [
      { title: 'What is Hashing?', body: 'A hash function takes a key (like "apple") and converts it to a number (like 42). That number tells us which "drawer" to store the value in.' },
      { title: 'O(1) Lookups', body: 'Once you know the drawer number, you go directly to it — no searching! That is why lookups are O(1) on average.' },
      { title: 'Collisions', body: 'Sometimes two keys hash to the same drawer. This is a collision. Python handles it with chaining (each drawer holds a small list).' },
      { title: 'Python dict', body: 'Python\'s built-in dict IS a hash table. d["key"] = "value" stores it. d["key"] retrieves it. Both are O(1).' },
      { title: 'Use Cases', body: 'Hash tables are used for caches, counting frequencies, checking membership, and grouping items. The Two Sum problem uses one!' },
    ],
    code: `# Hash Tables in Python (dict)
# Create
phone_book = {}

# Insert — O(1) average
phone_book["Alice"] = "555-1234"
phone_book["Bob"]   = "555-5678"

# Lookup — O(1) average
print(phone_book["Alice"])   # "555-1234"

# Check key exists — O(1)
if "Charlie" in phone_book:
    print(phone_book["Charlie"])
else:
    print("Not found!")

# Delete — O(1)
del phone_book["Bob"]

# Iterate — O(n)
for name, number in phone_book.items():
    print(f"{name}: {number}")

# Counter pattern — very common!
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = {}
for word in words:
    count[word] = count.get(word, 0) + 1
# count = {"apple": 3, "banana": 2, "cherry": 1}

# defaultdict makes this even cleaner
from collections import defaultdict
count2 = defaultdict(int)
for word in words:
    count2[word] += 1`,
    timeComplexity: 'Insert O(1) · Lookup O(1) · Delete O(1) avg',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'trees',
    name: 'Trees',
    emoji: '🌳',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    color: '#7c3aed',
    analogy: 'Family tree — root at top, children branch downward, leaves at bottom',
    description: 'A tree is a linked structure where each node can have multiple children. The top node is the root. Nodes with no children are leaves.',
    concepts: [
      { title: 'Tree Structure', body: 'A tree starts at the ROOT (top). Each node can have LEFT and RIGHT children. Nodes with no children are called LEAVES.' },
      { title: 'Depth & Height', body: 'Depth = how many levels down from the root. Height = the longest path from root to a leaf. A tree with just a root has height 0.' },
      { title: 'DFS Inorder', body: 'Depth-First Search Inorder: visit LEFT child, then ROOT, then RIGHT child. For a BST, this gives sorted order!' },
      { title: 'DFS Preorder', body: 'Preorder: visit ROOT first, then left, then right. Good for copying a tree.' },
      { title: 'BFS Level-Order', body: 'Breadth-First Search visits nodes level by level from top to bottom. Uses a queue. Great for finding shortest paths.' },
    ],
    code: `# Binary Tree in Python

class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = None    # left child
        self.right = None   # right child

# Build a tree manually
#       1
#      / \\
#     2   3
#    / \\
#   4   5
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

# DFS Inorder: Left → Root → Right
def inorder(node):
    if not node:
        return
    inorder(node.left)   # go left first
    print(node.val)       # visit root
    inorder(node.right)  # go right last
# Output: 4 2 5 1 3

# BFS: Level by level
from collections import deque
def bfs(root):
    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.val)
        if node.left:  queue.append(node.left)
        if node.right: queue.append(node.right)
# Output: 1 2 3 4 5

# Max depth — O(n)
def max_depth(node):
    if not node:
        return 0
    return 1 + max(max_depth(node.left), max_depth(node.right))`,
    timeComplexity: 'DFS O(n) · BFS O(n) · Insert O(log n) balanced',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'bst',
    name: 'BST',
    emoji: '🔍',
    category: 'Data Structures',
    difficulty: 'Intermediate',
    color: '#7c3aed',
    analogy: 'Hot or cold game — always know exactly which direction to search',
    description: 'A Binary Search Tree keeps values sorted: left child is always smaller, right child is always larger. Find anything in O(log n)!',
    concepts: [
      { title: 'BST Property', body: 'For EVERY node: all values in its LEFT subtree are SMALLER, all values in its RIGHT subtree are LARGER. This holds at every level!' },
      { title: 'Search', body: 'Start at root. If target < current, go left. If target > current, go right. If equal, found! Each step cuts the search space in half — O(log n).' },
      { title: 'Insert', body: 'Find where the new value belongs by searching, then attach it as a leaf. O(log n) for a balanced tree.' },
      { title: 'Inorder = Sorted', body: 'DFS inorder traversal of a BST gives all values in SORTED ORDER. This is a handy property for many problems.' },
      { title: 'Balanced vs Unbalanced', body: 'If you insert sorted values 1,2,3,4,5 into a BST, it becomes a straight line (degenerate) — O(n) lookups. AVL and Red-Black trees auto-balance.' },
    ],
    code: `# Binary Search Tree in Python

class BST:
    def __init__(self):
        self.root = None

    class Node:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    def insert(self, val):      # O(log n) average
        self.root = self._insert(self.root, val)

    def _insert(self, node, val):
        if not node:
            return self.Node(val)   # empty spot found
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        return node   # val == node.val means duplicate, skip

    def search(self, val):      # O(log n) average
        return self._search(self.root, val)

    def _search(self, node, val):
        if not node:
            return False        # not found
        if val == node.val:
            return True         # found!
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)

bst = BST()
for v in [5, 3, 7, 1, 4, 6, 8]:
    bst.insert(v)

print(bst.search(4))    # True
print(bst.search(9))    # False`,
    timeComplexity: 'Search O(log n) · Insert O(log n) · Delete O(log n) avg',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'graphs',
    name: 'Graphs',
    emoji: '🗺️',
    category: 'Data Structures',
    difficulty: 'Advanced',
    color: '#7c3aed',
    analogy: 'Cities on a map connected by roads — DFS goes deep, BFS goes wide',
    description: 'Graphs are nodes (vertices) connected by edges. Think of cities and roads. DFS explores deep, BFS explores wide.',
    concepts: [
      { title: 'Graph Basics', body: 'A graph has VERTICES (nodes) and EDGES (connections). Edges can be directed (one-way) or undirected (two-way). Roads can go both ways!' },
      { title: 'Adjacency List', body: 'The most common way to store a graph: a dictionary where each node maps to a list of its neighbors. Memory efficient for sparse graphs.' },
      { title: 'DFS', body: 'Depth-First Search goes as DEEP as possible before backtracking. Like exploring a maze: go down every path until you hit a dead end, then back up.' },
      { title: 'BFS', body: 'Breadth-First Search explores ALL neighbors at the current level before going deeper. Uses a queue. Finds the SHORTEST PATH in unweighted graphs.' },
      { title: 'Visited Set', body: 'Always track visited nodes to avoid infinite loops in graphs with cycles! A set gives O(1) membership checks.' },
    ],
    code: `# Graphs in Python (adjacency list)

graph = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B", "F"],
    "F": ["C", "E"]
}

# DFS — explores deep paths first, uses a stack
def dfs(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        node = stack.pop()          # take from top
        if node not in visited:
            visited.add(node)
            order.append(node)
            for neighbor in graph[node]:  # add neighbors
                if neighbor not in visited:
                    stack.append(neighbor)
    return order

# BFS — explores level by level, uses a queue
from collections import deque
def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()      # take from front
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

print(dfs(graph, "A"))   # A, C, F, E, B, D (order varies)
print(bfs(graph, "A"))   # A, B, C, D, E, F`,
    timeComplexity: 'DFS O(V+E) · BFS O(V+E)',
    spaceComplexity: 'O(V+E)',
  },
  {
    key: 'linearsearch',
    name: 'Linear Search',
    emoji: '🔦',
    category: 'Search Algorithms',
    difficulty: 'Beginner',
    color: '#0ea5e9',
    analogy: 'Looking for a sock in a messy drawer — check one by one',
    description: 'Linear search checks every item one by one from start to end. Simple but slow for large datasets — O(n).',
    concepts: [
      { title: 'What is Linear Search?', body: 'Start at the first item and check each one. If it matches, done! If you reach the end without finding it, it is not there.' },
      { title: 'Works on Any List', body: 'Unlike binary search, linear search works on UNSORTED lists. No preparation needed — just check everything.' },
      { title: 'Time Complexity', body: 'Best case: target is first item — O(1). Worst case: target is last or not found — O(n). Average case: O(n/2) = O(n).' },
      { title: 'When to Use It', body: 'Use linear search for small lists, unsorted data, or when you only search once. For repeated searches on large sorted data, use binary search.' },
    ],
    code: `# Linear Search in Python

def linear_search(arr, target):
    for i in range(len(arr)):        # check each index
        if arr[i] == target:          # is this the one?
            return i                  # found! return index
    return -1                         # not found

# Unsorted list — only option!
fruits = ["mango", "apple", "grape", "banana", "cherry"]

idx = linear_search(fruits, "grape")
print(idx)    # 2

idx = linear_search(fruits, "kiwi")
print(idx)    # -1 (not found)

# Using Python's built-in (also linear search)
print("apple" in fruits)      # True — O(n)
print(fruits.index("banana")) # 3 — O(n)

# Count occurrences — O(n)
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
count = sum(1 for x in nums if x == 5)
print(count)  # 2`,
    timeComplexity: 'O(n) worst/average · O(1) best',
    spaceComplexity: 'O(1)',
  },
  {
    key: 'binarysearch',
    name: 'Binary Search',
    emoji: '⚡',
    category: 'Search Algorithms',
    difficulty: 'Intermediate',
    color: '#0ea5e9',
    analogy: 'Guessing a number 1-100 — always guess the middle to cut in half',
    description: 'Binary search works on SORTED arrays. Each guess cuts the remaining possibilities in half. Finds any item in O(log n)!',
    concepts: [
      { title: 'Must Be Sorted!', body: 'Binary search ONLY works if the array is sorted. Checking the middle only makes sense when you know smaller values are left and bigger are right.' },
      { title: 'The Algorithm', body: 'Set left=0 and right=len-1. Find mid = (left+right)//2. If arr[mid] == target, done! If target < arr[mid], search left half. Else search right half.' },
      { title: 'Why O(log n)?', body: 'Each step cuts the remaining items in HALF. For 1,000,000 items: 1M → 500K → 250K → ... → 1 in about 20 steps. log₂(1,000,000) ≈ 20.' },
      { title: 'Off-by-One Bugs', body: 'The trickiest part is updating left and right correctly. Use left = mid+1 (not mid) and right = mid-1 (not mid) to avoid infinite loops.' },
    ],
    code: `# Binary Search in Python

def binary_search(arr, target):
    left = 0
    right = len(arr) - 1           # start: full range

    while left <= right:           # still have items to check
        mid = (left + right) // 2  # find the middle index

        if arr[mid] == target:
            return mid             # found it!
        elif target < arr[mid]:
            right = mid - 1        # search LEFT half
        else:
            left = mid + 1         # search RIGHT half

    return -1                      # target not in array

# MUST be sorted!
nums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

print(binary_search(nums, 7))    # 3 (found at index 3)
print(binary_search(nums, 6))    # -1 (not in list)

# Python has this built-in with bisect
import bisect
pos = bisect.bisect_left(nums, 7)
if pos < len(nums) and nums[pos] == 7:
    print(f"Found 7 at index {pos}")

# Recursive version
def binary_search_rec(arr, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    if target < arr[mid]:
        return binary_search_rec(arr, target, left, mid-1)
    return binary_search_rec(arr, target, mid+1, right)`,
    timeComplexity: 'O(log n) worst/average · O(1) best',
    spaceComplexity: 'O(1) iterative · O(log n) recursive',
  },
  {
    key: 'bubblesort',
    name: 'Bubble Sort',
    emoji: '🫧',
    category: 'Sorting Algorithms',
    difficulty: 'Beginner',
    color: '#f59e0b',
    analogy: 'Heaviest bubbles rise to the top with each pass',
    description: 'Bubble sort repeatedly compares adjacent pairs and swaps them if out of order. Largest values bubble to the end each pass.',
    concepts: [
      { title: 'How It Works', body: 'Compare items next to each other. If the left one is bigger, SWAP them. After one full pass, the largest item is at the end. Repeat for the rest.' },
      { title: 'Multiple Passes', body: 'After 1 pass: biggest element is sorted. After 2 passes: top 2 are sorted. After n-1 passes: everything sorted.' },
      { title: 'Optimization', body: 'If a full pass makes NO swaps, the array is already sorted! You can stop early. Best case becomes O(n) with this optimization.' },
      { title: 'Why It is Slow', body: 'O(n²) because for n items, you need n passes, each checking n items. Only good for learning — never used in practice for large data.' },
    ],
    code: `# Bubble Sort in Python

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):              # n passes total
        swapped = False
        for j in range(0, n-i-1):  # last i items already sorted
            if arr[j] > arr[j+1]:  # compare adjacent pair
                arr[j], arr[j+1] = arr[j+1], arr[j]  # SWAP!
                swapped = True
        if not swapped:             # optimization: already sorted
            break
    return arr

nums = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(nums))
# [11, 12, 22, 25, 34, 64, 90]

# Trace of first pass on [5, 3, 8, 1]:
# Compare 5,3 → swap → [3, 5, 8, 1]
# Compare 5,8 → no swap → [3, 5, 8, 1]
# Compare 8,1 → swap → [3, 5, 1, 8]  ← 8 bubbled to end!`,
    timeComplexity: 'O(n²) worst/avg · O(n) best (optimized)',
    spaceComplexity: 'O(1)',
  },
  {
    key: 'selectionsort',
    name: 'Selection Sort',
    emoji: '🎯',
    category: 'Sorting Algorithms',
    difficulty: 'Beginner',
    color: '#f59e0b',
    analogy: 'Find the shortest student, put them first, repeat',
    description: 'Selection sort finds the minimum element in the unsorted part and moves it to the front. Exactly n-1 swaps total.',
    concepts: [
      { title: 'How It Works', body: 'Divide the array into sorted (left) and unsorted (right) parts. Scan unsorted part to find the minimum. Swap it to the start of unsorted. Sorted part grows by 1.' },
      { title: 'Always O(n²)', body: 'Unlike bubble sort, selection sort always does O(n²) comparisons even if array is sorted. No early exit possible.' },
      { title: 'Minimum Swaps', body: 'Selection sort makes exactly n-1 swaps total — much fewer than bubble sort. Useful when writes are expensive (e.g., flash memory).' },
      { title: 'Not Stable', body: 'Selection sort is NOT stable — equal elements may change their relative order. This matters when sorting objects with multiple fields.' },
    ],
    code: `# Selection Sort in Python

def selection_sort(arr):
    n = len(arr)
    for i in range(n):                      # i = start of unsorted section
        min_idx = i                          # assume first unsorted is min
        for j in range(i+1, n):             # scan rest of unsorted
            if arr[j] < arr[min_idx]:        # found new min?
                min_idx = j                  # update min index
        arr[i], arr[min_idx] = arr[min_idx], arr[i]  # swap min to front
    return arr

nums = [29, 10, 14, 37, 13]
print(selection_sort(nums))
# [10, 13, 14, 29, 37]

# Step by step on [64, 25, 12, 22, 11]:
# Pass 1: min=11 at idx 4, swap with idx 0 → [11, 25, 12, 22, 64]
# Pass 2: min=12 at idx 2, swap with idx 1 → [11, 12, 25, 22, 64]
# Pass 3: min=22 at idx 3, swap with idx 2 → [11, 12, 22, 25, 64]
# Pass 4: min=25 at idx 3, swap with idx 3 → [11, 12, 22, 25, 64]
# Done!`,
    timeComplexity: 'O(n²) always',
    spaceComplexity: 'O(1)',
  },
  {
    key: 'insertionsort',
    name: 'Insertion Sort',
    emoji: '🃏',
    category: 'Sorting Algorithms',
    difficulty: 'Beginner',
    color: '#f59e0b',
    analogy: 'Sorting cards in your hand — pick one up, slide it into place',
    description: 'Insertion sort builds a sorted array one item at a time, inserting each new element into its correct position.',
    concepts: [
      { title: 'How It Works', body: 'Imagine sorting playing cards. Pick up one card at a time and slide it left until it is in the right spot. The left side stays sorted as you go.' },
      { title: 'Inner Loop', body: 'For each element, compare it with items to its left and shift them right until you find where to insert. Like making room for a new person in a sorted line.' },
      { title: 'Best Case O(n)', body: 'If the array is already sorted, the inner loop never runs — each element is already in place! Best case is O(n). Great for nearly-sorted data.' },
      { title: 'Stable Sort', body: 'Insertion sort is STABLE — equal elements maintain their original order. Important for multi-key sorting (sort by name, then by age).' },
    ],
    code: `# Insertion Sort in Python

def insertion_sort(arr):
    for i in range(1, len(arr)):    # start at index 1 (first is "sorted")
        key = arr[i]                 # the card we are inserting
        j = i - 1                   # start comparing left of key
        while j >= 0 and arr[j] > key:  # shift bigger elements right
            arr[j+1] = arr[j]        # slide element right
            j -= 1
        arr[j+1] = key               # insert key in correct spot
    return arr

nums = [12, 11, 13, 5, 6]
print(insertion_sort(nums))
# [5, 6, 11, 12, 13]

# Step by step on [5, 2, 4, 6, 1, 3]:
# i=1: key=2, shift 5 right → [2, 5, 4, 6, 1, 3]
# i=2: key=4, shift 5 right → [2, 4, 5, 6, 1, 3]
# i=3: key=6, already correct → [2, 4, 5, 6, 1, 3]
# i=4: key=1, shift all → [1, 2, 4, 5, 6, 3]
# i=5: key=3, shift 4,5,6 → [1, 2, 3, 4, 5, 6]`,
    timeComplexity: 'O(n²) worst · O(n) best',
    spaceComplexity: 'O(1)',
  },
  {
    key: 'quicksort',
    name: 'Quick Sort',
    emoji: '⚡',
    category: 'Sorting Algorithms',
    difficulty: 'Advanced',
    color: '#f59e0b',
    analogy: 'Pick a referee number, smaller numbers go left, bigger go right',
    description: 'Quick sort picks a pivot element and partitions the array around it. Elements smaller than pivot go left, larger go right. Divide and conquer!',
    concepts: [
      { title: 'Pivot', body: 'Pick any element as the PIVOT (referee). Rearrange so everything smaller is to its left, everything bigger is to its right. Pivot is now in its FINAL sorted position!' },
      { title: 'Partition', body: 'The partition step does the actual work. Walk through the array, putting small items before the pivot. This takes O(n) time.' },
      { title: 'Divide & Conquer', body: 'After partitioning, recursively sort the left and right halves. Each recursive call handles a smaller subproblem.' },
      { title: 'O(n log n) Average', body: 'If pivot splits evenly each time: log n levels, each O(n) work = O(n log n). Worst case: pivot is always max/min → O(n²). Random pivot helps.' },
    ],
    code: `# Quick Sort in Python

def quick_sort(arr):
    if len(arr) <= 1:           # base case: 0 or 1 items already sorted
        return arr
    pivot = arr[len(arr) // 2]  # pick middle as pivot
    left  = [x for x in arr if x < pivot]   # smaller than pivot
    mid   = [x for x in arr if x == pivot]  # equal to pivot
    right = [x for x in arr if x > pivot]   # bigger than pivot
    return quick_sort(left) + mid + quick_sort(right)

nums = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(nums))
# [1, 1, 2, 3, 6, 8, 10]

# In-place partition (more memory efficient)
def partition(arr, low, high):
    pivot = arr[high]    # last element as pivot
    i = low - 1          # pointer for smaller elements
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1         # pivot's final index

def quick_sort_inplace(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort_inplace(arr, low, pi-1)
        quick_sort_inplace(arr, pi+1, high)`,
    timeComplexity: 'O(n log n) avg · O(n²) worst',
    spaceComplexity: 'O(log n) avg stack space',
  },
  {
    key: 'mergesort',
    name: 'Merge Sort',
    emoji: '🔀',
    category: 'Sorting Algorithms',
    difficulty: 'Intermediate',
    color: '#f59e0b',
    analogy: 'Two sorted piles are easy to merge — compare fronts one at a time',
    description: 'Merge sort splits the array in half, recursively sorts each half, then merges the two sorted halves. Guaranteed O(n log n).',
    concepts: [
      { title: 'Split & Conquer', body: 'Keep halving the array until each piece is size 1 (already sorted!). Then merge pairs of sorted pieces. The merge step is where the real work happens.' },
      { title: 'Merge Step', body: 'Given two sorted arrays, merge them: compare the first elements of each, take the smaller one, repeat. Like merging two sorted card piles.' },
      { title: 'Always O(n log n)', body: 'Unlike quick sort, merge sort ALWAYS does O(n log n) — no bad pivot choices. Preferred when worst-case performance matters.' },
      { title: 'Extra Space', body: 'Merge sort needs O(n) extra space for the temporary merged arrays. Quick sort is better for memory-constrained environments.' },
    ],
    code: `# Merge Sort in Python

def merge_sort(arr):
    if len(arr) <= 1:
        return arr                  # base case: already sorted

    mid = len(arr) // 2             # find the middle
    left  = merge_sort(arr[:mid])   # sort left half
    right = merge_sort(arr[mid:])   # sort right half
    return merge(left, right)       # merge two sorted halves

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:     # left front is smaller
            result.append(left[i])
            i += 1
        else:                        # right front is smaller
            result.append(right[j])
            j += 1
    result.extend(left[i:])         # append remaining left items
    result.extend(right[j:])        # append remaining right items
    return result

nums = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(nums))
# [3, 9, 10, 27, 38, 43, 82]

# Why stable? Equal elements: left item is appended first (left[i] <= right[j])
# This preserves the original relative order of equal elements`,
    timeComplexity: 'O(n log n) always',
    spaceComplexity: 'O(n)',
  },
  {
    key: 'countingsort',
    name: 'Counting Sort',
    emoji: '🔢',
    category: 'Sorting Algorithms',
    difficulty: 'Intermediate',
    color: '#f59e0b',
    analogy: 'Count how many of each value exist, no comparisons needed',
    description: 'Counting sort counts occurrences of each value. No comparisons! Blazing fast O(n+k) when values are in a known small range.',
    concepts: [
      { title: 'Count, Not Compare', body: 'Instead of comparing items, just COUNT how many times each value appears. Then rebuild the array from counts. No comparisons = faster than O(n log n) limits!' },
      { title: 'Count Array', body: 'Create an array of size (max_val+1), all zeros. For each input element, increment count[element]. This tallies all occurrences.' },
      { title: 'Rebuild', body: 'Walk the count array from 0 to max. If count[i] = 3, add the value i exactly 3 times to the output. Voila — sorted!' },
      { title: 'Limitations', body: 'Only works for integers in a known range. If max value k is large (like 1 billion), the count array would be huge. Best when k is small relative to n.' },
    ],
    code: `# Counting Sort in Python

def counting_sort(arr):
    if not arr:
        return arr

    max_val = max(arr)                   # find the range
    count = [0] * (max_val + 1)          # count array, all zeros

    for num in arr:                       # count each value
        count[num] += 1

    result = []
    for i, cnt in enumerate(count):      # rebuild sorted array
        result.extend([i] * cnt)         # add i exactly cnt times
    return result

nums = [4, 2, 2, 8, 3, 3, 1]
print(counting_sort(nums))
# [1, 2, 2, 3, 3, 4, 8]

# Trace on [4, 2, 2, 8, 3, 3, 1]:
# max = 8, count array has 9 slots (0–8)
# After counting: [0,1,2,2,1,0,0,0,1]
#                  0 1 2 3 4 5 6 7 8
# Rebuild: 0×0, 1×1, 2×2, 3×2, 4×1, 8×1
# = [1, 2, 2, 3, 3, 4, 8]

# Time: O(n + k) where k = max value
# Best when k is small, like sorting exam scores (0-100)`,
    timeComplexity: 'O(n + k) where k = max value',
    spaceComplexity: 'O(n + k)',
  },
  {
    key: 'radixsort',
    name: 'Radix Sort',
    emoji: '🎰',
    category: 'Sorting Algorithms',
    difficulty: 'Advanced',
    color: '#f59e0b',
    analogy: 'Sort by the ones digit, then tens digit, then hundreds',
    description: 'Radix sort sorts integers digit by digit, from least significant to most significant. Uses counting sort on each digit. O(d×n) time!',
    concepts: [
      { title: 'Digit by Digit', body: 'Sort all numbers by their ONES digit first (0-9). Then sort by TENS digit. Then HUNDREDS. After d rounds, the whole array is sorted!' },
      { title: 'LSD Radix Sort', body: 'LSD = Least Significant Digit first. Start from the rightmost digit, work left. This is the most common version.' },
      { title: 'Must Be Stable', body: 'Each digit-pass MUST be a STABLE sort (preserves relative order of equal elements). Counting sort is used for each digit pass since digits are in range 0-9.' },
      { title: 'When It Wins', body: 'For n numbers with d digits, radix sort is O(d×n). If d is small (like sorting phone numbers with 10 digits), it beats O(n log n) comparison sorts!' },
    ],
    code: `# Radix Sort in Python

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10           # digits 0–9

    for num in arr:             # count digits at position exp
        digit = (num // exp) % 10
        count[digit] += 1

    for i in range(1, 10):     # cumulative count
        count[i] += count[i-1]

    for i in range(n-1, -1, -1):  # build output (stable!)
        digit = (arr[i] // exp) % 10
        output[count[digit]-1] = arr[i]
        count[digit] -= 1

    for i in range(n):
        arr[i] = output[i]

def radix_sort(arr):
    max_val = max(arr)
    exp = 1                    # start with ones digit
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10              # move to next digit
    return arr

nums = [170, 45, 75, 90, 802, 24, 2, 66]
print(radix_sort(nums))
# [2, 24, 45, 66, 75, 90, 170, 802]

# Passes:
# Sort by 1s:  170, 90, 802, 2, 24, 45, 75, 66
# Sort by 10s: 802, 2, 24, 45, 66, 170, 75, 90
# Sort by 100s: 2, 24, 45, 66, 75, 90, 170, 802`,
    timeComplexity: 'O(d × n) where d = number of digits',
    spaceComplexity: 'O(n + k)',
  },
];

export const CATEGORIES = {
  'Data Structures': { color: '#7c3aed', topics: ['arrays', 'stacks', 'queues', 'linkedlists', 'hashtables', 'trees', 'bst', 'graphs'] },
  'Search Algorithms': { color: '#0ea5e9', topics: ['linearsearch', 'binarysearch'] },
  'Sorting Algorithms': { color: '#f59e0b', topics: ['bubblesort', 'selectionsort', 'insertionsort', 'quicksort', 'mergesort', 'countingsort', 'radixsort'] },
};
