node cli test/fixtures/base.input.html -o test/fixtures/base.output.php
php test/fixtures/base.output.php > test/fixtures/base.output.html

node cli test/fixtures/json.input.html -o test/fixtures/json.output.php
php test/fixtures/json.output.php > test/fixtures/json.output.html
