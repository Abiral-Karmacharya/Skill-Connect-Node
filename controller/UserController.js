require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const Role = require("../model/rolemodel");
const Expert = require("../model/expertmodel");
const Service = require("../model/servicemodel");
const Review = require("../model/reviewmodel");
// const expert = require("../model/expertmodel");
// For signup
const createuser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }

    const foundRole = await Role.findOne({ where: { Role: role } });
    if (!foundRole) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      Name: name,
      Email: email,
      Password: newpassword,
      RoleID: foundRole.RoleID,
    });
    if (foundRole.RoleID == 3) {
      const UserId = await User.findOne({ where: { Email: email } });
      const expert = await Expert.create({
        UserID: UserId.UserID,
      });
    }
    return res
      .status(201)
      .json({ success: true, message: "user created", newuser: newUser });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

//login page
const loginpage = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credential" });
    }
    const token = jwt.sign(
      { id: user.UserID, email: user.Email, role: user.Role },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );
    console.log(User.UserID);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.UserID,
        username: user.Name,
        email: user.Email,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

//get users
const getallusers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["Password"] },
    });
    console.log("user", users);
    return res.json({ success: true, users: users, message: "Users found" });
  } catch (error) {
    return res.status(500).json({ error: "Error fetching users" });
  }
};

// const getuser1 = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const user = await User.findByPk(userId);
//     res.json({ success: true, user: user });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

const getuser = async (req, res) => {
  try {
    // The authenticateToken middleware should decode the JWT and add user info to req.user
    const userId = req.user.id; // or req.user._id depending on your user model

    // Fetch only the current user's data
    const user_select = await User.findByPk(userId); // Exclude password
    if (!user_select) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({
      users: user_select,
      message: "User found",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateuser = async (req, res) => {
  console.log(req.body);
  try {
    const userId = req.user.id;
    // const userId = 31;

    const {
      name,
      email,
      bio,
      phone,
      location,
      skills,
      role,
      currentPassword,
      newPassword,
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Handle password update if both fields provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.Password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect current password" });
      }

      if (currentPassword === newPassword) {
        return res.status(400).json({
          message: "New password cannot be the same as current password",
        });
      }

      const salt = await bcrypt.genSalt(10);
      user.Password = await bcrypt.hash(newPassword, salt);
    }

    // Update only changed fields
    if (name && name !== user.Name) user.Name = name;
    if (email && email !== user.Email) user.Email = email;
    if (bio && bio !== user.Bio) user.Bio = bio;
    if (phone && phone !== user.PhoneNumber) user.PhoneNumber = phone;
    if (location && location !== user.Location) user.Location = location;
    if (skills && skills !== user.Skills) user.Skills = skills;
    if (role && role !== user.Role) user.Role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      user: {
        Name: user.Name,
        Email: user.Email,
        Role: user.Role,
        Bio: user.Bio,
        PhoneNumber: user.PhoneNumber,
        Location: user.Location,
        Skills: user.Skills,
      },
    });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteuser = async (req, res) => {
  try {
    const userId = req.user.id;
    // const userId = 31;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy({
      where: { UserID: userId },
    });

    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getexperts = async (req, res) => {
  try {
    const experts = await User.findAll({
      where: {
        RoleID: 3,
      },
    });
    return res.json(experts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getexpert = async (req, res) => {
  try {
    const expertId = req.params.id;
    const expert = await User.findByPk(expertId);
    return res.json(expert);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

const service = async (req, res) => {
  console.log(req.body);
  try {
    const {
      expertId,
      projectTitle,
      projectDescription,
      deadline,
      budget,
      requirements,
    } = req.body;

    const userId = req.user.id;
    // const userId = 31;
    const expert = await Expert.findOne({
      where: {
        UserID: expertId,
      },
    });

    const userExpertId = expert.ExpertID;
    // const userId = parseInt(req.user.id);

    const services = await Service.create({
      Title: projectTitle,
      Description: projectDescription,
      Requirements: requirements,
      Price: budget,
      // Deadline: deadline,
      UserID: parseInt(userId),
      ExpertID: parseInt(userExpertId),
    });
    if (services) {
      return res
        .status(200)
        .json({ success: true, message: "Service created" });
    }
    console.log(services);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    // const userId = 31;
    const currentUser = await User.findByPk(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRoleID = currentUser.RoleID;
    let services = [];
    const formattedServices = [];

    if (userRoleID === 3) {
      // User is an EXPERT (RoleID = 3)
      const expert = await Expert.findOne({ where: { UserID: userId } });

      if (!expert) {
        return res.status(404).json({ message: "Expert profile not found" });
      }

      services = await Service.findAll({
        where: { ExpertID: expert.ExpertID },
      });

      for (const service of services) {
        const client = await User.findByPk(service.UserID);

        formattedServices.push({
          ServiceID: service.ServiceID,
          Title: service.Title,
          Description: service.Description,
          Requirements: service.Requirements,
          Deadline: service.Deadline,
          Price: service.Price,
          status: service.Status,
          createdAt: service.CreatedDate,
          Name: client ? client.Name : "Unknown Client",
          userType: "expert",
        });
      }
    } else if (userRoleID === 2) {
      // User is a CLIENT (RoleID = 2)
      services = await Service.findAll({
        where: { UserID: userId },
      });

      for (const service of services) {
        const expert = await Expert.findByPk(service.ExpertID);
        let expertUser = null;

        if (expert) {
          expertUser = await User.findByPk(expert.UserID);
        }

        formattedServices.push({
          ServiceID: service.ServiceID,
          Title: service.Title,
          Description: service.Description,
          Requirements: service.Requirements,
          Deadline: service.Deadline,
          Price: service.Price,
          status: service.Status,
          createdAt: service.CreatedDate,
          Name: expertUser ? expertUser.Name : "Unassigned Expert",
          userType: "client",
        });
      }
    } else if (userRoleID === 1) {
      // User is an ADMIN (RoleID = 1)
      services = await Service.findAll();

      for (const service of services) {
        const expert = await Expert.findByPk(service.ExpertID);
        const client = await User.findByPk(service.UserID);
        let expertUser = null;

        if (expert) {
          expertUser = await User.findByPk(expert.UserID);
        }

        formattedServices.push({
          ServiceID: service.ServiceID,
          Title: service.Title,
          Description: service.Description,
          Requirements: service.Requirements,
          Deadline: service.Deadline,
          Price: service.Price,
          status: service.Status,
          createdAt: service.CreatedDate,
          Name: client ? client.Name : "Unknown Client", // For consistency with existing frontend
          ExpertName: expertUser ? expertUser.Name : "Unassigned Expert",
          ClientName: client ? client.Name : "Unknown Client",
          userType: "admin",
        });
      }
    } else {
      return res.status(403).json({ message: "Invalid user role" });
    }

    // Return just the array like before (compatible with existing frontend)
    return res.json({
      success: true,
      formattedServices,
      message: "Logs retrieved",
    });
  } catch (error) {
    console.error("Error in getlogs:", error);
    return res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const acceptService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    console.log(serviceId);
    const userId = req.user.id;

    // Find the service and update status
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update status to in-progress
    await service.update({ Status: "in-progress" });

    return res.status(200).json({ message: "Service accepted successfully" });
  } catch (error) {
    console.error("Error accepting service:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const declineService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update status to declined
    const updateData = { Status: "declined" };

    await service.update(updateData);

    return res.status(200).json({ message: "Service declined successfully" });
  } catch (error) {
    console.error("Error declining service:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const completeService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update status to declined
    const updateData = { Status: "completed" };

    await service.update(updateData);

    return res.status(200).json({ message: "Service completed successfully" });
  } catch (error) {
    console.error("Error completing service:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Add these review controller functions to your existing userController.js

const submitReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;
    const userId = req.user.id; // From your auth middleware

    // Validate required fields
    if (!serviceId || !rating || !comment) {
      return res.status(400).json({
        message:
          "All fields are required: serviceId, expertId, rating, comment",
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Check if service exists and is completed
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.Status !== "completed") {
      return res.status(400).json({
        message: "Service must be completed before reviewing",
      });
    }

    // Check if user has already reviewed this service
    const existingReview = await Review.findOne({
      where: {
        ServiceID: serviceId,
        UserID: userId,
      },
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this service",
      });
    }

    const expert = await Expert.findByPk(service.ExpertID);
    if (!expert) {
      return res
        .status(404)
        .json({ message: "Expert not found for this service" });
    }
    // Find the expert's UserID from the expertId (which might be ExpertID)
    let expertUserId = expert.ExpertID;
    console.log(expertUserId);

    // Create new review
    const newReview = await Review.create({
      ServiceID: serviceId,
      UserID: userId,
      Rating: rating,
      Comment: comment.trim(),
    });

    // Update expert's average rating
    await updateExpertRating(expertUserId);

    res.status(201).json({
      message: "Review submitted successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const reviews = await Review.findAll({
      where: { ServiceID: serviceId },
      order: [["createdDate", "DESC"]],
    });

    // If the association isn't set up, fetch user data manually
    const formattedReviews = [];
    for (const review of reviews) {
      const reviewer = await User.findByPk(review.UserID);
      formattedReviews.push({
        ReviewID: review.ReviewID,
        ServiceID: review.ServiceID,
        Rating: review.Rating,
        Comment: review.Comment,
        createdAt: review.createdAt,
        ReviewerName: reviewer ? reviewer.Name : "Unknown User",
        ReviewerEmail: reviewer ? reviewer.Email : "Unknown Email",
      });
    }

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getExpertReviews = async (req, res) => {
  try {
    const { expertId } = req.params;

    // Find all reviews for this expert
    const reviews = await Review.findAll({
      where: { ExpertID: expertId },
      order: [["createdAt", "DESC"]],
    });

    const formattedReviews = [];
    let totalRating = 0;

    for (const review of reviews) {
      const reviewer = await User.findByPk(review.UserID);
      const service = await Service.findByPk(review.ServiceID);

      totalRating += review.Rating;

      formattedReviews.push({
        ReviewID: review.ReviewID,
        ServiceID: review.ServiceID,
        Rating: review.Rating,
        Comment: review.Comment,
        createdAt: review.createdAt,
        ReviewerName: reviewer ? reviewer.Name : "Unknown User",
        ServiceTitle: service ? service.Title : "Unknown Service",
        ServiceDescription: service ? service.Description : "No description",
      });
    }

    const averageRating =
      reviews.length > 0 ? (totalRating / reviews.length).toFixed(2) : 0;

    res.status(200).json({
      reviews: formattedReviews,
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length,
    });
  } catch (error) {
    console.error("Error fetching expert reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Helper function to update expert's average rating
const updateExpertRating = async (expertUserId) => {
  try {
    // Calculate average rating for this expert
    const reviews = await Review.findAll({
      where: { ExpertID: expertUserId },
    });

    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.Rating,
        0
      );
      const averageRating = (totalRating / reviews.length).toFixed(2);

      // Update the expert's user record
      await User.update(
        {
          AverageRating: parseFloat(averageRating),
          TotalReviews: reviews.length,
        },
        { where: { UserID: expertUserId } }
      );
    }
  } catch (error) {
    console.error("Error updating expert rating:", error);
  }
};

// Get user's own reviews (reviews they've written)
const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.findAll({
      where: { UserID: userId },
      order: [["createdAt", "DESC"]],
    });

    const formattedReviews = [];

    for (const review of reviews) {
      const service = await Service.findByPk(review.ServiceID);
      const expert = await User.findByPk(review.ExpertID);

      formattedReviews.push({
        ReviewID: review.ReviewID,
        ServiceID: review.ServiceID,
        Rating: review.Rating,
        Comment: review.Comment,
        createdAt: review.createdAt,
        ExpertName: expert ? expert.Name : "Unknown Expert",
        ServiceTitle: service ? service.Title : "Unknown Service",
      });
    }

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//Home page
const mainpage = (req, res) => {
  res.send("This is the main page");
};

module.exports = {
  createuser,
  mainpage,
  loginpage,
  getallusers,
  getuser,
  updateuser,
  deleteuser,
  getexperts,
  getexpert,
  service,
  getlogs,
  acceptService,
  declineService,
  completeService,
  submitReview, // New
  getReviews, // New
  getExpertReviews, // New
  getUserReviews, // New
  updateExpertRating, // New helper function
};
