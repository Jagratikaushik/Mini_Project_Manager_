# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the .csproj and restore dependencies
COPY Assignment_2/backend/*.csproj ./backend/
RUN dotnet restore backend/*.csproj

# Copy all source code
COPY Assignment_2/backend/. ./backend/

# Build the project in Release mode
WORKDIR /src/backend
RUN dotnet build *.csproj -c Release -o /app/build

# Publish the app
RUN dotnet publish *.csproj -c Release -o /app/publish

# Use the official .NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 80
EXPOSE 80

# Set entry point
ENTRYPOINT ["dotnet", "YourBackend.dll"]
