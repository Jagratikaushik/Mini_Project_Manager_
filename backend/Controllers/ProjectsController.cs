using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProjectsController : ControllerBase  // Changed from TasksController to ProjectsController
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)  // Changed constructor name
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(CreateProjectDto request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var project = new Project
            {
                Title = request.Title,
                Description = request.Description,
                UserId = userId
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project created successfully", projectId = project.Id });
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var projects = await _context.Projects
                .Where(p => p.UserId == userId)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Description,
                    p.UserId,
                    p.CreatedAt,
                    Tasks = p.Tasks.Select(t => new
                    {
                        t.Id,
                        t.Title,
                        t.Description,
                        t.IsCompleted,
                        t.CreatedAt
                    }).ToList()
                })
                .ToListAsync();

            return Ok(projects);
        }

        // GET /api/projects/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var project = await _context.Projects
                .Where(p => p.Id == id && p.UserId == userId)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Description,
                    p.UserId,
                    p.CreatedAt,
                    Tasks = p.Tasks.Select(t => new
                    {
                        t.Id,
                        t.Title,
                        t.Description,
                        t.IsCompleted,
                        t.CreatedAt
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (project == null)
                return NotFound("Project not found");

            return Ok(project);
        }

        // DELETE /api/projects/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (project == null)
                return NotFound("Project not found");

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Project deleted successfully" });
        }

        // POST /api/projects/{projectId}/tasks
        [HttpPost("{projectId}/tasks")]
        public async Task<IActionResult> CreateTask(int projectId, CreateTaskDto request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);

            if (project == null)
                return NotFound("Project not found");

            var task = new TaskItem
            {
                Title = request.Title,
                Description = request.Description ?? string.Empty,
                ProjectId = projectId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Task created successfully", taskId = task.Id });
        }
    }
}