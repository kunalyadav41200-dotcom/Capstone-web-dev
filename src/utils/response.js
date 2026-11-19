exports.success = (res, status, message, data = null) => res.status(status).json({ success: true, message, data });
