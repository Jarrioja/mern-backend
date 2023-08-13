import ProductManager from '../../domain/managers/productManager.js';

const authorization = (permission) => {
  return async (req, res, next) => {
    const user = req.user;
    const productId = req.params.productId; // Obtener el ID del producto de los parámetros

    if (permission === 'deleteProduct' || 'updateProduct') {
      // Verificar si el usuario es administrador
      if (user.isAdmin) {
        return next(); // Admin puede borrar cualquier producto
      }

      // Obtener información del producto, incluido el propietario
      const manager = new ProductManager();
      const product = await manager.findById(productId); // Reemplaza esto con la función adecuada para obtener el producto

      // Verificar si el usuario premium es propietario del producto
      if (user.role.name === 'premium' && product.owner === user.email) {
        return next(); // Usuario premium puede borrar sus propios productos
      }

      return res.status(401).send({ message: 'Not authorized' });
    }

    // Resto de la lógica para otros permisos
    if (!user.isAdmin && !user.role.permissions.includes(permission)) {
      return res.status(401).send({ message: 'Not authorized' });
    }

    next();
  };
};

export default authorization;
