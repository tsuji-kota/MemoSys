FROM ruby:3.1

WORKDIR /app1

COPY Gemfile /app1/Gemfile
COPY Gemfile.lock /app1/Gemfile.lock

RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]