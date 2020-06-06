// Dependencies
import { Repository, DeepPartial, DeleteResult, FindManyOptions } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

/**
 * Base service for resources.
 * @author Daniel Mejia
 */
export class BaseService<T> {
  /**
   * Creates an instance of {@link BaseService}
   * @param repository The repository instance.
   */
  constructor(public repository: Repository<T>) { }

  /**
   * List the resources.
   * @return { Promise<T[]> } The list of resources.
   */
  async listResources(options?: FindManyOptions<T>): Promise<{ data: T[], quantity: number }> {
    const [data, quantity] = await this.repository.findAndCount(options);
    return { data, quantity };
  }

  /**
   * Retrieve a resource by id.
   * @param { number } id The identifier of the resource.
   * @return { Promise<T> } A resource found.
   */
  retrieveResource(id: number): Promise<T> {
    return this.repository.findOne(id);
  }

  /**
   * Create a resource in.
   * @param { any } resource The resource params to create.
   * @return { Promise<T> } A resource created.
   */
  createResource(resource: DeepPartial<T>): Promise<T> {
    return this.repository.save(resource);
  }

  /**
   * Updates a resource.
   * @param { number } id The identifier of the resource.
   * @param { T } resource The resource params to update.
   * @return { Promise<T> } A resource updated.
   */
  async updateResource(id: number, resource: T): Promise<T> {
    const foundResource = await this.retrieveResource(id);
    if (foundResource) {
      return this.repository.save({ ...foundResource, ...resource, id });
    }

    throw new NotFoundException();

  }

  /**
   * Deletes a resource.
   * @param { number } id The identifier of the resource.
   * @return { Promise<T> } A resource deleted.
   */
  async deleteResource(id: number): Promise<DeleteResult> {
    const foundResource = await this.retrieveResource(id);
    if (foundResource) {
      return this.repository.delete(id);
    }

    throw new NotFoundException();
  }
}
