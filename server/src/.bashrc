echo "Hello, World!" 
# Register the user on terminal start


USERNAME=$(whoami)

curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d "{\"username\": \"$USERNAME\"}" \
> /dev/null 2>&1


# Save every executed command and call the addCommand API
export PROMPT_COMMAND='history 1 | { read x command; curl -X POST http://localhost:3000/api/addCommands -H "Content-Type: application/json" -d "{\"username\": \"$(whoami)\", \"command\": \"$command\"}" > /dev/null 2>&1; }'


# Bind Tab+Backspace to call the getCommands API
bind '"\C-I": "curl -X GET http://localhost:3000/api/getCommands?username=$(whoami) -H \"Content-Type: application/json\""\n'
